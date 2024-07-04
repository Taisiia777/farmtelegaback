import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Mission } from './mission.entity';
import { User } from '../user/user.entity';

@Injectable()
export class MissionService {
  constructor(
    @InjectRepository(Mission)
    private missionRepository: Repository<Mission>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<Mission[]> {
    return this.missionRepository.find();
  }

  async findDailyMissions(): Promise<Mission[]> {
    return this.missionRepository.find({ where: { type: 'daily' } });
  }

  async findWeeklyMissions(): Promise<Mission[]> {
    return this.missionRepository.find({ where: { type: 'weekly' } });
  }

  async completeMission(userId: number, missionId: number): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const mission = await this.missionRepository.findOne({ where: { id: missionId } });

    if (!user || !mission) {
      throw new Error('User or Mission not found');
    }

    user.coins += mission.reward;
    await this.userRepository.save(user);
  }
}
