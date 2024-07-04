import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RewardService } from './reward.service';
import { RewardController } from './reward.controller';
import { Reward } from './reward.entity';
import { User } from '../user/user.entity';
import { UserActionLog } from '../user-action-log/user-action-log.entity';
import { UserActionLogService } from '../user-action-log/user-action-log.service';
import { WebhookService } from '../webhook/webhook.service';
import { WebhookModule } from '../webhook/webhook.module';
import { HttpModule } from '@nestjs/axios'; // Импортируем HttpModule
import { ConfigModule } from '@nestjs/config'; // Импортируем ConfigModule

@Module({
  imports: [TypeOrmModule.forFeature([Reward, User, UserActionLog]), WebhookModule, HttpModule, ConfigModule],
  providers: [RewardService, UserActionLogService, WebhookService],
  controllers: [RewardController],
  exports: [RewardService],
})
export class RewardModule {}
