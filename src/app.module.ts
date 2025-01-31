import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { FileParserService } from './services/file-parser.service';
import { LoggingService } from './services/logging.service';
import { LogEntry, LogEntrySchema } from './schemas/log-entry.schema';

dotenv.config();

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: `${process.env.NODE_ENV}.env` }),
    MongooseModule.forRoot(`${process.env.DATABASE_URL}`),
    MongooseModule.forFeature([
      { name: LogEntry.name, schema: LogEntrySchema },
    ]),
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const filename = `${Date.now()}-${file.originalname}`;
          cb(null, filename);
        },
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService, FileParserService, LoggingService],
})
export class AppModule {}
