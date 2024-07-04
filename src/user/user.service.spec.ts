import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.username = createUserDto.username;
    user.coins = createUserDto.coins ?? 0;
    user.incomeMultiplier = createUserDto.incomeMultiplier ?? 1;
    user.coinsPerHour = createUserDto.coinsPerHour ?? 0;
    user.xp = createUserDto.xp ?? 0;
    user.level = createUserDto.level ?? 1;
    return this.userRepository.save(user);
  }

  findOne(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    await this.userRepository.update(id, updateUserDto);
    return this.userRepository.findOneBy({ id });
  }

  async earnCoins(id: number, amount: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: id } });
    if (!user) {
      throw new Error('User not found');
    }
    user.coins += amount;
    await this.userRepository.save(user);
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
      user.xp = 0; // или уменьшить на количество необходимого опыта для уровня
    }
    await this.userRepository.save(user);
    return user;
  }

  @Cron('0 * * * * *') // Каждый час
  async addHourlyIncome(): Promise<void> {
    const users = await this.userRepository.find();
    users.forEach(async (user) => {
      user.coins += user.coinsPerHour * user.incomeMultiplier;
      await this.userRepository.save(user);
    });
  }
}
