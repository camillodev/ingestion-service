import { Test, TestingModule } from '@nestjs/testing';
import { CleanedDataController } from './cleaned-data.controller';

describe('CleanedDataController', () => {
  let controller: CleanedDataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CleanedDataController],
    }).compile();

    controller = module.get<CleanedDataController>(CleanedDataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
