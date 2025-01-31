export class CreateLogEntryDto {
  level: string;
  message: string;
  context?: string;
}
