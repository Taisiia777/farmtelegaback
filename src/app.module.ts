import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { RewardModule } from './reward/reward.module';
import { ReferralModule } from './referral/referral.module';
import { BoosterModule } from './booster/booster.module';
import { CoinModule } from './coin/coin.module';
import { MissionModule } from './mission/mission.module';
import { EventModule } from './event/event.module';
import { LeaderboardModule } from './leaderboard/leaderboard.module';
import { UserActionLogModule } from './user-action-log/user-action-log.module';
import { WebhookModule } from './webhook/webhook.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'tapalki',
      autoLoadEntities: true,
      synchronize: true,
    }),
    UserModule,
    RewardModule,
    ReferralModule,
    BoosterModule,
    CoinModule,
    MissionModule,
    EventModule,
    LeaderboardModule,
    UserActionLogModule,
    WebhookModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
