import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DailyReward } from './daily-reward.entity';
import { User } from '../user/user.entity';
import { CreateDailyRewardDto } from './dto/create-daily-reward.dto';

@Injectable()
export class DailyRewardService {
  constructor(
    @InjectRepository(DailyReward)
    private dailyRewardRepository: Repository<DailyReward>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createDailyRewardDto: CreateDailyRewardDto): Promise<DailyReward> {
    const dailyReward = this.dailyRewardRepository.create(createDailyRewardDto);
    return this.dailyRewardRepository.save(dailyReward);
  }

  async giveDailyReward(userId: number, day: number): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const reward = await this.dailyRewardRepository.findOne({ where: { day } });

    if (!user || !reward) {
      throw new Error('User or Reward not found');
    }

    user.coins += reward.amount;
    await this.userRepository.save(user);
  }
}
