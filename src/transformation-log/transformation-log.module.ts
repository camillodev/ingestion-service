import { Module } from '@nestjs/common';
import { TransformationLogService } from './transformation-log.service';
import { TransformationLogController } from './transformation-log.controller';

@Module({
  providers: [TransformationLogService],
  controllers: [TransformationLogController]
})
export class TransformationLogModule {}
