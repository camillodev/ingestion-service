import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CleanedDataModule } from './cleaned-data/cleaned-data.module';
import { TransformationLogModule } from './transformation-log/transformation-log.module';
import { CleanedDataclearController } from './cleaned-dataclear/cleaned-dataclear.controller';
import { IngestionModule } from './ingestion/ingestion.module';
import { DataAccessModule } from './data-access/data-access.module';
import { IngestionModule } from './ingestion/ingestion.module';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: `${process.env.NODE_ENV}.env` }),
    MongooseModule.forRoot(`${process.env.DATABASE_URL}`),
    CleanedDataModule,
    TransformationLogModule,
    IngestionModule,
    DataAccessModule,
  ],
  controllers: [AppController, CleanedDataclearController],
  providers: [AppService],
})
export class AppModule {}
