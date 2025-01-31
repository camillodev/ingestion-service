import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiResponse, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { FileUploadDto } from 'src/dtos/FileUploadDto';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('ingestion-file')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'File to upload',
    type: FileUploadDto,
  })
  @ApiResponse({ status: 201, description: 'File processed successfully.' })
  @ApiResponse({ status: 400, description: 'Unsupported file format.' })
  async ingestFile(@UploadedFile() file: Express.Multer.File) {
    // Process the file and return the result
    // system should handle many requests in parallel
    // or at least queue them without data corruption.
    return await this.appService.processFile(file);
  }
}
