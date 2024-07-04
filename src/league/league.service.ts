import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { League } from './league.entity';
import { User } from '../user/user.entity';

@Injectable()
export class LeagueService {
  constructor(
    @InjectRepository(League)
    private leagueRepository: Repository<League>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async checkAndAssignLeague(userId: number): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const leagues = await this.leagueRepository.find();

    for (const league of leagues) {
      if (user.coins >= league.achievement) {
        user.coins += league.reward;
        user.incomeMultiplier = league.incomeMultiplier;
      }
    }

    await this.userRepository.save(user);
  }
}
