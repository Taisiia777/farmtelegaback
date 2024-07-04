import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { UserActionLog } from '../user-action-log/user-action-log.entity';
import { UserActionLogService } from '../user-action-log/user-action-log.service';
import { WebhookModule } from '../webhook/webhook.module';
import { WebhookService } from '../webhook/webhook.service';
import { HttpModule } from '@nestjs/axios'; // Импортируем HttpModule
import { ConfigModule } from '@nestjs/config'; // Импортируем ConfigModule

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserActionLog]),
    WebhookModule,
    HttpModule,
    ConfigModule
  ],
  providers: [UserService, UserActionLogService, WebhookService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
