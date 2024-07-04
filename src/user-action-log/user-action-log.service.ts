import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserActionLog } from './user-action-log.entity';

@Injectable()
export class UserActionLogService {
  constructor(
    @InjectRepository(UserActionLog)
    private userActionLogRepository: Repository<UserActionLog>,
  ) {}

  async logAction(userId: number, action: string): Promise<void> {
    const log = new UserActionLog();
    log.userId = userId;
    log.action = action;
    await this.userActionLogRepository.save(log);
  }

  async getUserActions(userId: number): Promise<UserActionLog[]> {
    return this.userActionLogRepository.find({ where: { userId } });
  }
}
