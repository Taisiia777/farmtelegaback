import { Test, TestingModule } from '@nestjs/testing';
import { LeaderboardService } from './leaderboard.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { Repository } from 'typeorm';

describe('LeaderboardService', () => {
  let service: LeaderboardService;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LeaderboardService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<LeaderboardService>(LeaderboardService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get top users', async () => {
    const user1 = { id: 1, username: 'User1', coins: 1000 };
    const user2 = { id: 2, username: 'User2', coins: 500 };
    jest.spyOn(userRepository, 'find').mockResolvedValue([user1, user2] as User[]);
    const result = await service.getTopUsers(2);
    expect(result).toEqual([user1, user2]);
  });

  // Добавьте больше тестов для проверки различных аспектов сервиса
});
