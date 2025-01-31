import { Schema, Document } from 'mongoose';

export interface ILog extends Document {
  action: string;
  details: any;
  timestamp: Date;
}

const LogSchema = new Schema<ILog>({
  action: { type: String, required: true },
  details: { type: Schema.Types.Mixed, required: true },
  timestamp: { type: Date, default: Date.now },
});

export default LogSchema;
