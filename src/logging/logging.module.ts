import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggingService } from './logging.service';
import { LogEntry, LogEntrySchema } from './schemas/log-entry.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: LogEntry.name, schema: LogEntrySchema },
    ]),
  ],
  providers: [LoggingService],
  exports: [LoggingService],
})
export class LoggingModule {}
