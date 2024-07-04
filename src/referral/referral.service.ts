import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Referral } from './referral.entity';
import { User } from '../user/user.entity';

@Injectable()
export class ReferralService {
  constructor(
    @InjectRepository(Referral)
    private referralRepository: Repository<Referral>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async addReferral(refererId: number, referredId: number, level: number): Promise<Referral> {
    const referer = await this.userRepository.findOne({ where: { id: refererId } });
    const referred = await this.userRepository.findOne({ where: { id: referredId } });

    if (!referer || !referred) {
      throw new Error('User not found');
    }

    const referral = new Referral();
    referral.referer = referer;
    referral.level = level;
    referral.coins = 0;

    return this.referralRepository.save(referral);
  }

  async updateReferralEarnings(userId: number, coinsEarned: number): Promise<void> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['referrals']
    });
    if (user.referrals) {
      user.referrals.forEach(referral => {
        let percentage = 0;
        switch (referral.level) {
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
        referral.coins += coinsEarned * percentage;
        this.referralRepository.save(referral);
      });
    }
  }
}
