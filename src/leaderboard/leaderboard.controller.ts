import { Controller, Get, Query } from '@nestjs/common';
import { LeaderboardService } from './leaderboard.service';

@Controller('leaderboard')
export class LeaderboardController {
  constructor(private readonly leaderboardService: LeaderboardService) {}

  @Get()
  getTopUsers(@Query('limit') limit: number) {
    return this.leaderboardService.getTopUsers(limit);
  }
}
