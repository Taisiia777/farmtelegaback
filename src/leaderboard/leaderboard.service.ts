import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';

@Injectable()
export class LeaderboardService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getTopUsers(limit: number): Promise<User[]> {
    return this.userRepository.find({
      order: { coins: 'DESC' },
      take: limit,
    });
  }
}
