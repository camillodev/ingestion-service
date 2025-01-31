import { Module } from '@nestjs/common';
import { CleanedDataService } from './cleaned-data.service';
import { CleanedDataController } from './cleaned-data.controller';

@Module({
  providers: [CleanedDataService],
  controllers: [CleanedDataController]
})
export class CleanedDataModule {}
