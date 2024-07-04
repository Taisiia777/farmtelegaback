import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserActionLogService } from './user-action-log.service';
import { UserActionLogController } from './user-action-log.controller';
import { UserActionLog } from './user-action-log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserActionLog])],
  providers: [UserActionLogService],
  controllers: [UserActionLogController],
  exports: [UserActionLogService, TypeOrmModule], // Экспортируем также TypeOrmModule
})
export class UserActionLogModule {}
