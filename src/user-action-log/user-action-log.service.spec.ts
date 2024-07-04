import { Test, TestingModule } from '@nestjs/testing';
import { UserActionLogService } from './user-action-log.service';

describe('UserActionLogService', () => {
  let service: UserActionLogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserActionLogService],
    }).compile();

    service = module.get<UserActionLogService>(UserActionLogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
