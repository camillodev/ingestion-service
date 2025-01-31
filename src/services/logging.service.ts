import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LogEntry } from '../schemas/log-entry.schema';
import { CreateLogEntryDto } from 'src/dtos/CreateLogEntryDto';

@Injectable()
export class LoggingService {
  constructor(
    @InjectModel(LogEntry.name) private readonly logModel: Model<LogEntry>,
  ) {}

  async createLogEntry(
    createLogEntryDto: CreateLogEntryDto,
  ): Promise<LogEntry> {
    try {
      const createdLog = new this.logModel(createLogEntryDto);
      return await createdLog.save();
    } catch (error) {
      // Handle error appropriately, e.g., log it or throw a custom error
      throw new Error('Error creating log entry: ' + error.message);
    }
  }
}
