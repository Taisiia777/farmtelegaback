import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reward } from './reward.entity';
import { User } from '../user/user.entity';
import { UserActionLogService } from '../user-action-log/user-action-log.service';
import { WebhookService } from '../webhook/webhook.service';
import { CreateRewardDto } from './dto/create-reward.dto';

@Injectable()
export class RewardService {
  constructor(
    @InjectRepository(Reward)
    private rewardRepository: Repository<Reward>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly userActionLogService: UserActionLogService,
    private readonly webhookService: WebhookService,
  ) {}

  async create(createRewardDto: CreateRewardDto): Promise<Reward> {
    const reward = this.rewardRepository.create(createRewardDto);
    return await this.rewardRepository.save(reward);
  }

  async giveRandomReward(userId: number): Promise<string> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new Error('User not found');
    }

    // Здесь должна быть логика генерации случайной награды
    const reward = new Reward();
    reward.user = user;
    reward.description = 'Random Reward';
    reward.type = 'coin';
    reward.amount = Math.floor(Math.random() * 100);

    await this.rewardRepository.save(reward);
    return `Random reward given to user ${userId}`;
  }

  async addReward(refererId: number, referredId: number, level: number): Promise<Reward> {
    const referer = await this.userRepository.findOneBy({ id: refererId });
    const referred = await this.userRepository.findOneBy({ id: referredId });

    if (!referer || !referred) {
      throw new Error('User not found');
    }

    const reward = new Reward();
    reward.referer = referer;
    reward.level = level;
    reward.coins = 0;

    await this.rewardRepository.save(reward);
    await this.userActionLogService.logAction(refererId, 'add_reward');
    await this.webhookService.sendEvent('reward_added', { refererId, referredId, level });

    return reward;
  }

  async updateRewardEarnings(userId: number, coinsEarned: number): Promise<void> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['rewards']
    });

    if (user?.rewards) {
      for (const reward of user.rewards) {
        let percentage = 0;
        switch (reward.level) {
          case 1:
            percentage = 0.20;
            break;
          case 2:
            percentage = 0.10;
            break;
          case 3:
            percentage = 0.05;
            break;
        }
        reward.coins += coinsEarned * percentage;
        await this.rewardRepository.save(reward);
        await this.userActionLogService.logAction(userId, 'update_reward_earnings');
        await this.webhookService.sendEvent('reward_earnings_updated', { userId, rewardId: reward.id, coinsEarned });
      }
    }
  }
}
