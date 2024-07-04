import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Coin } from './coin.entity';
import { User } from '../user/user.entity';
import { UserActionLogService } from '../user-action-log/user-action-log.service';
import { WebhookService } from '../webhook/webhook.service';

@Injectable()
export class CoinService {
  constructor(
    @InjectRepository(Coin)
    private coinRepository: Repository<Coin>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly userActionLogService: UserActionLogService,
    private readonly webhookService: WebhookService,
  ) {}

  async buyCoin(userId: number, coinId: number): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const coin = await this.coinRepository.findOne({ where: { id: coinId } });

    if (!user || !coin) {
      throw new Error('User or Coin not found');
    }

    if (user.coins < coin.cost) {
      throw new Error('Not enough coins');
    }

    user.coins -= coin.cost;
    user.coinsPerHour += coin.hourlyIncome;

    await this.userRepository.save(user);
    await this.userActionLogService.logAction(userId, 'buy_coin');
    await this.webhookService.sendEvent('coin_bought', { userId, coinId });
  }
}
