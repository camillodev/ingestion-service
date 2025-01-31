import { Injectable } from '@nestjs/common';
import { ProcessedData } from './types';
import { LoggingService } from './services/logging.service';
import { FileParserService } from './services/file-parser.service';

@Injectable()
export class AppService {
  constructor(
    private loggingService: LoggingService,
    private fileParserService: FileParserService,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }

  async processFile(
    file: Express.Multer.File,
  ): Promise<{ message: string; data: ProcessedData[] }> {
    const data: ProcessedData[] = await this.fileParserService.parseFile(file);
    const unifiedData = this.fileParserService.combineData(data);
    // const cleanedData = this.cleanData(data);

    // Store cleaned data and log transformations
    // await this.cleanedDataModel.insertMany(unifiedData);
    // await this.logTransformations(unifiedData);

    return { message: 'File processed successfully', data: unifiedData };
  }
}
