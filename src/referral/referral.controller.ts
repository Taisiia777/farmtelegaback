import { Controller, Post, Body, Param } from '@nestjs/common';
import { ReferralService } from './referral.service';

@Controller('referral')
export class ReferralController {
  constructor(private readonly referralService: ReferralService) {}

  @Post('add/:refererId/:referredId/:level')
  addReferral(@Param('refererId') refererId: number, @Param('referredId') referredId: number, @Param('level') level: number) {
    return this.referralService.addReferral(refererId, referredId, level);
  }

  @Post('update-earnings/:userId/:coinsEarned')
  updateReferralEarnings(@Param('userId') userId: number, @Param('coinsEarned') coinsEarned: number) {
    return this.referralService.updateReferralEarnings(userId, coinsEarned);
  }
}
