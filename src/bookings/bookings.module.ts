// src/bookings/bookings.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { Booking, BookingSchema } from '../schemas/booking.schema';
import { User, UserSchema } from 'src/schemas/user.schema';
import { Flight, FlightSchema } from 'src/schemas/flight.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Booking.name, schema: BookingSchema },
      { name: User.name, schema: UserSchema },
      { name: Flight.name, schema: FlightSchema }

    ]),
  ],
  controllers: [BookingsController],
  providers: [BookingsService],
  exports: [BookingsService],
})
export class BookingsModule {}
