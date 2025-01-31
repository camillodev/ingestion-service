import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class CleanedData extends Document {
  @Prop({ required: true })
  fieldName: string;

  @Prop({ required: true })
  normalizedValue: number;

  @Prop({ default: Date.now })
  timestamp: Date;
}

export const CleanedDataSchema = SchemaFactory.createForClass(CleanedData);
