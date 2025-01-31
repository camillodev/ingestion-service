import { Injectable } from '@nestjs/common';
import parse from 'csv-parser';
import { XMLParser } from 'fast-xml-parser';
import * as fs from 'fs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CleanedData } from '../schemas/cleaned-data.schema';
import { TransformationLog } from '../schemas/transformation-log.schema';
import { ProcessedData } from './types'; // Import the interface

@Injectable()
export class IngestionService {
  constructor(
    @InjectModel(CleanedData.name) private cleanedDataModel: Model<CleanedData>,
    @InjectModel(TransformationLog.name)
    private transformationLogModel: Model<TransformationLog>,
  ) {}

  async processFile(
    file: Express.Multer.File,
  ): Promise<{ message: string; data: ProcessedData[] }> {
    let data: ProcessedData[];
    if (file.mimetype === 'application/json') {
      data = JSON.parse(file.buffer.toString()) as ProcessedData[];
    } else if (file.mimetype === 'text/csv') {
      data = await this.parseCsv(file.buffer.toString());
    } else if (file.mimetype === 'application/xml') {
      const parser = new XMLParser();
      data = parser.parse(file.buffer.toString()) as ProcessedData[];
    } else {
      throw new Error('Unsupported file format');
    }

    // Data cleaning and transformation logic here
    const cleanedData = this.cleanData(data);

    // Store cleaned data and log transformations
    await this.cleanedDataModel.insertMany(cleanedData);
    await this.logTransformations(cleanedData);

    return { message: 'File processed successfully', data: cleanedData };
  }

  private async parseCsv(data: string): Promise<ProcessedData[]> {
    return new Promise((resolve, reject) => {
      const results: ProcessedData[] = [];
      fs.createReadStream(data)
        .pipe(parse())
        .on('data', (row) => results.push(row as ProcessedData))
        .on('end', () => resolve(results))
        .on('error', (error) => reject(error));
    });
  }

  private cleanData(data: ProcessedData[]): ProcessedData[] {
    // Implement data cleaning logic
    return data.map((entry) => {
      // Normalize fields and handle outliers
      return entry; // Return cleaned entry
    });
  }

  private async logTransformations(data: ProcessedData[]): Promise<void> {
    // Log transformations or outlier detections
    await this.transformationLogModel.insertMany(
      data.map((entry) => ({
        operation: 'Data cleaned',
        details: JSON.stringify(entry),
      })),
    );
  }
}
