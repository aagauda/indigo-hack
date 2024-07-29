// src/schemas/flight.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FlightDocument = Flight & Document;

@Schema({timestamps:true})
export class Flight {

  @Prop({ required: true })
  flight_id: string;

  @Prop({ required: true })
  airline: string;

  @Prop({ required: true })
  status: string;

  @Prop({ required: true })
  departure_gate: string;

  @Prop({ required: true })
  arrival_gate: string;

  @Prop({ required: true })
  scheduled_departure: Date;

  @Prop({ required: true })
  scheduled_arrival: Date;

  @Prop()
  actual_departure: Date;

  @Prop()
  actual_arrival: Date;
}

export const FlightSchema = SchemaFactory.createForClass(Flight);
