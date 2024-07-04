import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoinService } from './coin.service';
import { CoinController } from './coin.controller';
import { Coin } from './coin.entity';
import { User } from '../user/user.entity';
import { UserActionLogModule } from '../user-action-log/user-action-log.module'; // Импортируем UserActionLogModule
import { WebhookService } from '../webhook/webhook.service';
import { HttpModule } from '@nestjs/axios'; // Импортируем HttpModule
import { ConfigModule } from '@nestjs/config'; // Импортируем ConfigModule

@Module({
  imports: [TypeOrmModule.forFeature([Coin, User]), UserActionLogModule, ConfigModule, HttpModule], // Добавляем HttpModule в imports
  providers: [CoinService, WebhookService],
  controllers: [CoinController],
  exports: [CoinService],
})
export class CoinModule {}
