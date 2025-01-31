import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { IngestionService } from './ingestion.service';
import { ApiTags, ApiResponse, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { ApiProperty } from '@nestjs/swagger';

class FileUploadDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;
}

@ApiTags('ingestion')
@Controller('ingestion-file')
export class IngestionController {
  constructor(private readonly ingestionService: IngestionService) {}

  @Post()
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
    return await this.ingestionService.processFile(file);
  }
}
