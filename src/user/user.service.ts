import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Cron } from '@nestjs/schedule';
import { UserActionLogService } from '../user-action-log/user-action-log.service';
import { WebhookService } from '../webhook/webhook.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly userActionLogService: UserActionLogService,
    private readonly webhookService: WebhookService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    await this.userRepository.save(user);
    await this.userActionLogService.logAction(user.id, 'create');
    await this.webhookService.sendEvent('user_created', user);
    return user;
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    return user;
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    await this.userRepository.update(id, updateUserDto);
    const user = await this.userRepository.findOneBy({ id });
    await this.userActionLogService.logAction(id, 'update');
    await this.webhookService.sendEvent('user_updated', user);
    return user;
  }

  async earnCoins(id: number, amount: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: id } });
    if (!user) {
      throw new Error('User not found');
    }
    user.coins += amount;
    await this.userRepository.save(user);
    await this.userActionLogService.logAction(id, 'earn_coins');
    await this.webhookService.sendEvent('coins_earned', { userId: id, amount });
    return user;
  }

  async addXP(id: number, amount: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: id } });
    if (!user) {
      throw new Error('User not found');
    }
    user.xp += amount;
    if (user.xp >= user.level * 1000) {
      user.level += 1;
      user.xp = 0;
      await this.webhookService.sendEvent('level_up', { userId: id, level: user.level });
    }
    await this.userRepository.save(user);
    await this.userActionLogService.logAction(id, 'add_xp');
    return user;
  }

  @Cron('0 * * * * *') // Каждый час
  async addHourlyIncome(): Promise<void> {
    const users = await this.userRepository.find();
    for (const user of users) {
      user.coins += user.coinsPerHour * user.incomeMultiplier;
      await this.userRepository.save(user);
      await this.userActionLogService.logAction(user.id, 'hourly_income');
      await this.webhookService.sendEvent('hourly_income_added', { userId: user.id, coins: user.coins });
    }
  }
}
