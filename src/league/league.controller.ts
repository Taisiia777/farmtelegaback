import { Controller, Post, Param } from '@nestjs/common';
import { LeagueService } from './league.service';

@Controller('league')
export class LeagueController {
  constructor(private readonly leagueService: LeagueService) {}

  @Post('check/:userId')
  checkAndAssignLeague(@Param('userId') userId: number) {
    return this.leagueService.checkAndAssignLeague(userId);
  }
}
