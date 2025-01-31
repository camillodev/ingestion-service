import { Module } from '@nestjs/common';
import { DataAccessController } from './data-access.controller';
import { DataAccessService } from './data-access.service';

@Module({
  controllers: [DataAccessController],
  providers: [DataAccessService]
})
export class DataAccessModule {}
