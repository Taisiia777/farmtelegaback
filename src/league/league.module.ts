import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeagueService } from './league.service';
import { LeagueController } from './league.controller';
import { League } from './league.entity';
import { User } from '../user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([League, User])],
  providers: [LeagueService],
  controllers: [LeagueController],
  exports: [LeagueService],
})
export class LeagueModule {}
