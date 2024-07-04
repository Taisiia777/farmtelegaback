import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoosterService } from './booster.service';
import { BoosterController } from './booster.controller';
import { Booster } from './booster.entity';
import { User } from '../user/user.entity';
import { UserActionLog } from '../user-action-log/user-action-log.entity';
import { UserActionLogService } from '../user-action-log/user-action-log.service';
import { WebhookService } from '../webhook/webhook.service';
import { WebhookModule } from '../webhook/webhook.module';
import { HttpModule } from '@nestjs/axios'; // Импортируем HttpModule
import { ConfigModule } from '@nestjs/config'; // Импортируем ConfigModule

@Module({
  imports: [TypeOrmModule.forFeature([Booster, User, UserActionLog]), WebhookModule, HttpModule, ConfigModule],
  providers: [BoosterService, UserActionLogService, WebhookService],
  controllers: [BoosterController],
  exports: [BoosterService],
})
export class BoosterModule {}
