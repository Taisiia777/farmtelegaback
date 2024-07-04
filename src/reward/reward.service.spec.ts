import { Test, TestingModule } from '@nestjs/testing';
import { RewardService } from './reward.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Reward } from './reward.entity';
import { User } from '../user/user.entity';
import { Repository } from 'typeorm';

describe('RewardService', () => {
  let service: RewardService;
  let rewardRepository: Repository<Reward>;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RewardService,
        {
          provide: getRepositoryToken(Reward),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<RewardService>(RewardService);
    rewardRepository = module.get<Repository<Reward>>(getRepositoryToken(Reward));
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a reward', async () => {
    const rewardData = { description: 'Test Reward', type: 'coin', amount: 100 };
    jest.spyOn(rewardRepository, 'save').mockResolvedValue(rewardData as Reward);
    const result = await service.create(rewardData);
    expect(result).toEqual(rewardData);
  });

  // Добавьте больше тестов для проверки различных аспектов сервиса
});
