import { Controller, Get, Param } from '@nestjs/common';
import { UserActionLogService } from './user-action-log.service';

@Controller('user-action-log')
export class UserActionLogController {
  constructor(private readonly userActionLogService: UserActionLogService) {}

  @Get(':userId')
  getUserActions(@Param('userId') userId: number) {
    return this.userActionLogService.getUserActions(userId);
  }
}
