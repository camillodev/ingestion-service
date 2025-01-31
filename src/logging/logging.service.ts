import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LogEntry } from './schemas/log-entry.schema';
import { CreateLogEntryDto } from './dto/create-log-entry.dto';

@Injectable()
export class LoggingService {
  constructor(@InjectModel(LogEntry.name) private logModel: Model<LogEntry>) {}

  async createLogEntry(
    createLogEntryDto: CreateLogEntryDto,
  ): Promise<LogEntry> {
    const createdLog = new this.logModel(createLogEntryDto);
    return createdLog.save();
  }
}
