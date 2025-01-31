import { Test, TestingModule } from '@nestjs/testing';
import { TransformationLogService } from './transformation-log.service';

describe('TransformationLogService', () => {
  let service: TransformationLogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransformationLogService],
    }).compile();

    service = module.get<TransformationLogService>(TransformationLogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
