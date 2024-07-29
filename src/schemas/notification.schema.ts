// src/schemas/notification.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type NotificationDocument = Notification & Document;

@Schema({timestamps:true})
export class Notification {

  @Prop({ required: false })
  userId: string;

  @Prop({ required: true })
  notification_id: string;

  @Prop({ required: true })
  flight_id: string;

  @Prop({ required: true })
  message: string;

  @Prop({ required: true })
  timestamp: Date;

  @Prop({ required: true })
  method: string;

  @Prop({ required: true })
  recipient: string;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
