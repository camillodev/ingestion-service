import { Module } from '@nestjs/common';
import { DataAccessController } from './data-access.controller';
import { DataAccessService } from './data-access.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CleanedData, CleanedDataSchema } from '../schemas/cleaned-data.schema';
import {
  TransformationLog,
  TransformationLogSchema,
} from 'src/schemas/transformation-log.schema';

@Module({
  controllers: [DataAccessController],
  providers: [DataAccessService],
  imports: [
    MongooseModule.forFeature([
      { name: CleanedData.name, schema: CleanedDataSchema },
      { name: TransformationLog.name, schema: TransformationLogSchema },
    ]),
  ],
  exports: [
    MongooseModule.forFeature([
      { name: CleanedData.name, schema: CleanedDataSchema },
      { name: TransformationLog.name, schema: TransformationLogSchema },
    ]),
  ],
})
export class DataAccessModule {}
