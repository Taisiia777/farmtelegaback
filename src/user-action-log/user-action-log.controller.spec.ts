import { Test, TestingModule } from '@nestjs/testing';
import { UserActionLogController } from './user-action-log.controller';

describe('UserActionLogController', () => {
  let controller: UserActionLogController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserActionLogController],
    }).compile();

    controller = module.get<UserActionLogController>(UserActionLogController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
