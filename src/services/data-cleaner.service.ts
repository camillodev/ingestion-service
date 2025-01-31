import { Injectable } from '@nestjs/common';
import { ProcessedData } from '../types';
import { LoggingService } from './logging.service';

@Injectable()
export class DataCleanerService {
  constructor(private loggingService: LoggingService) {}

  /**
   * Cleans and normalizes the provided data.
   * @param data - Array of processed data to be cleaned.
   * @returns Cleaned and normalized data.
   */
  async cleanData(data: ProcessedData[]): Promise<ProcessedData[]> {
    return Promise.all(data.map((entry) => this.cleanAndNormalizeData(entry)));
  }

  /**
   * Cleans and normalizes a single data entry.
   * @param entry - The data entry to be cleaned.
   * @returns Cleaned and normalized data entry.
   */
  private async cleanAndNormalizeData(
    entry: ProcessedData,
  ): Promise<ProcessedData> {
    try {
      // Handle missing fields and provide default values
      const { id, ...rest } = entry;
      const normalizedEntry: ProcessedData = {
        id: id || 'unknown-id',
        LDL: entry.LDL !== undefined ? entry.LDL : 0,
        HbA1c: entry.HbA1c !== undefined ? entry.HbA1c : 0,
        name: entry.name || 'unknown-name',
        ...rest,
      };

      await this.detectOutliers(normalizedEntry);

      return normalizedEntry;
    } catch (error) {
      await this.loggingService.createLogEntry({
        level: 'error',
        message: `Error cleaning data entry: ${error instanceof Error ? error.message : 'Unknown error'}`,
        context: 'DataCleanerService',
      });
      return entry;
    }
  }

  /**
   * Detects outliers in the data entry and logs them.
   * @param entry - The data entry to check for outliers.
   */
  private async detectOutliers(entry: ProcessedData): Promise<void> {
    if (entry.LDL && entry.LDL > 200) {
      await this.loggingService.createLogEntry({
        level: 'warning',
        message: `Outlier detected: LDL > 200 for entry ID ${entry.id}`,
        context: 'DataCleanerService',
      });
    }
    if (entry.HbA1c && entry.HbA1c > 7.0) {
      await this.loggingService.createLogEntry({
        level: 'warning',
        message: `Outlier detected: HbA1c > 7.0 for entry ID ${entry.id}`,
        context: 'DataCleanerService',
      });
    }
  }
}
