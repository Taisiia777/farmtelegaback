import { Controller, Post, Body, Param } from '@nestjs/common';
import { RewardService } from './reward.service';
import { CreateRewardDto } from './dto/create-reward.dto';

@Controller('reward')
export class RewardController {
  constructor(private readonly rewardService: RewardService) {}

  @Post()
  create(@Body() createRewardDto: CreateRewardDto) {
    return this.rewardService.create(createRewardDto);
  }

  @Post('random/:userId')
  giveRandomReward(@Param('userId') userId: number) {
    return this.rewardService.giveRandomReward(userId);
  }
}
