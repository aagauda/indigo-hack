// src/schemas/user.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';
import { Booking } from './booking.schema';


export type UserDocument = User & Document;

@Schema({timestamps:true})
export class User {

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Booking' }] })
  bookings: Booking[];
}

export const UserSchema = SchemaFactory.createForClass(User);
