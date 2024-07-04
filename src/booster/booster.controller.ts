import { Controller, Post, Param } from '@nestjs/common';
import { BoosterService } from './booster.service';

@Controller('booster')
export class BoosterController {
  constructor(private readonly boosterService: BoosterService) {}

  @Post('apply/:userId/:boosterId')
  applyBooster(@Param('userId') userId: number, @Param('boosterId') boosterId: number) {
    return this.boosterService.applyBooster(userId, boosterId);
  }
}
