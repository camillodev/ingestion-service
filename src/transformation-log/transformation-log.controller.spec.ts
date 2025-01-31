import { Test, TestingModule } from '@nestjs/testing';
import { TransformationLogController } from './transformation-log.controller';

describe('TransformationLogController', () => {
  let controller: TransformationLogController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransformationLogController],
    }).compile();

    controller = module.get<TransformationLogController>(TransformationLogController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
