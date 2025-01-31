import { Injectable } from '@nestjs/common';
import { ProcessedData } from '../types';
import { parse } from 'csv-parse';
import { XMLParser } from 'fast-xml-parser';
import * as fs from 'fs';

@Injectable()
export class FileParserService {
  async parseFile(file: Express.Multer.File): Promise<ProcessedData[]> {
    if (file.mimetype === 'application/json') {
      return JSON.parse(file.buffer.toString()) as ProcessedData[];
    } else if (file.mimetype === 'text/csv') {
      return await this.parseCsv(file.buffer.toString());
    } else if (file.mimetype === 'application/xml') {
      const parser = new XMLParser();
      return parser.parse(file.buffer.toString()) as ProcessedData[];
    } else {
      throw new Error('Unsupported file format');
    }
  }

  private async parseCsv(data: string): Promise<ProcessedData[]> {
    return new Promise((resolve, reject) => {
      const results: ProcessedData[] = [];
      const readStream = fs.createReadStream(data);
      const parser = parse();
      readStream.pipe(parser);

      parser.on('data', (row) => results.push(row as ProcessedData));
      parser.on('end', () => resolve(results));
      parser.on('error', (error) =>
        reject(error instanceof Error ? error : new Error(String(error))),
      );
    });
  }
  combineData(data: ProcessedData[]): ProcessedData[] {
    const combinedMap: Record<string, ProcessedData> = {};

    data.forEach((entry) => {
      this.addToCombinedMap(entry, combinedMap);
    });

    return Object.values(combinedMap);
  }

  private addToCombinedMap(
    entry: ProcessedData,
    combinedMap: Record<string, ProcessedData>,
  ): void {
    const { id, ...otherProps } = entry;

    if (!combinedMap[id]) {
      combinedMap[id] = { id, ...otherProps };
    } else {
      combinedMap[id] = this.mergeEntries(combinedMap[id], otherProps);
    }
  }

  private mergeEntries(
    existingEntry: ProcessedData,
    newProps: Partial<ProcessedData>,
  ): ProcessedData {
    return {
      ...existingEntry,
      ...newProps,
    };
  }
}
