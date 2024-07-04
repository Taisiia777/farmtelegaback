import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booster } from './booster.entity';
import { User } from '../user/user.entity';
import { UserActionLogService } from '../user-action-log/user-action-log.service';
import { WebhookService } from '../webhook/webhook.service';

@Injectable()
export class BoosterService {
  constructor(
    @InjectRepository(Booster)
    private boosterRepository: Repository<Booster>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly userActionLogService: UserActionLogService,
    private readonly webhookService: WebhookService,
  ) {}

  async applyBooster(userId: number, boosterId: number): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const booster = await this.boosterRepository.findOne({ where: { id: boosterId } });

    if (!user || !booster) {
      throw new Error('User or Booster not found');
    }

    if (user.coins < booster.cost) {
      throw new Error('Not enough coins');
    }

    user.coins -= booster.cost;
    // Logika povysheniya urozhaunosti i energii dlya sbora
    // .... (additional logic for applying booster effects)

    await this.userRepository.save(user);
    await this.userActionLogService.logAction(userId, 'apply_booster');
    await this.webhookService.sendEvent('booster_applied', { userId, boosterId });
  }
}
