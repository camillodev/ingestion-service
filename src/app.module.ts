import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { DataAccessModule } from './data-access/data-access.module';
import * as dotenv from 'dotenv';
import { IngestionModule } from './ingestion/ingestion.module';

dotenv.config();

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: `${process.env.NODE_ENV}.env` }),
    MongooseModule.forRoot(`${process.env.DATABASE_URL}`),
    IngestionModule,
    DataAccessModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
