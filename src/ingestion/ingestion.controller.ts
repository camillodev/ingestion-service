/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { IngestionService } from './ingestion.service';

@Controller('ingestion')
export class IngestionController {
  constructor(private readonly ingestionService: IngestionService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async ingestFile(@UploadedFile() file: Express.Multer.File) {
    // Process the file and return the result
    return await this.ingestionService.processFile(file);
  }
}
