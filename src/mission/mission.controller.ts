import { Controller, Get, Post, Param } from '@nestjs/common';
import { MissionService } from './mission.service';

@Controller('mission')
export class MissionController {
  constructor(private readonly missionService: MissionService) {}

  @Get()
  findAll() {
    return this.missionService.findAll();
  }

  @Get('daily')
  findDailyMissions() {
    return this.missionService.findDailyMissions();
  }

  @Get('weekly')
  findWeeklyMissions() {
    return this.missionService.findWeeklyMissions();
  }

  @Post('complete/:userId/:missionId')
  completeMission(@Param('userId') userId: number, @Param('missionId') missionId: number) {
    return this.missionService.completeMission(userId, missionId);
  }
}
