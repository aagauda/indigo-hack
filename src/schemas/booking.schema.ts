import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from './user.schema';

export type BookingDocument = Booking & Document;

@Schema({timestamps:true})
export class Booking {

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: User;

  @Prop({ required: true })
  flight_id: string;

  @Prop({ required: true })
  status: string;

  @Prop({ required: true })
  booking_date: Date;

  @Prop({ required: true })
  seat_number: string;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
