import { Controller, Post, Param, Body } from '@nestjs/common';
import { DailyRewardService } from './daily-reward.service';
import { CreateDailyRewardDto } from './dto/create-daily-reward.dto';

@Controller('daily-reward')
export class DailyRewardController {
  constructor(private readonly dailyRewardService: DailyRewardService) {}

  @Post()
  create(@Body() createDailyRewardDto: CreateDailyRewardDto) {
    return this.dailyRewardService.create(createDailyRewardDto);
  }

  @Post('give/:userId/:day')
  giveDailyReward(@Param('userId') userId: number, @Param('day') day: number) {
    return this.dailyRewardService.giveDailyReward(userId, day);
  }
}
