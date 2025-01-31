import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class TransformationLog extends Document {
  @Prop({ required: true })
  operation: string;

  @Prop({ required: true })
  details: string;

  @Prop({ default: Date.now })
  timestamp: Date;
}

export const TransformationLogSchema =
  SchemaFactory.createForClass(TransformationLog);
