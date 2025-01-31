import { Test, TestingModule } from '@nestjs/testing';
import { CleanedDataService } from './cleaned-data.service';

describe('CleanedDataService', () => {
  let service: CleanedDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CleanedDataService],
    }).compile();

    service = module.get<CleanedDataService>(CleanedDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
