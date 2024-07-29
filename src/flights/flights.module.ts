// src/flights/flights.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FlightsService } from './flights.service';
import { FlightsController } from './flights.controller';
import { Flight, FlightSchema } from '../schemas/flight.schema';
import { User, UserSchema } from 'src/schemas/user.schema';
import { Notification, NotificationSchema } from 'src/schemas/notification.schema';
import { NotificationsService } from 'src/notifications/notifications.service';
import { Booking, BookingSchema } from 'src/schemas/booking.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Flight.name, schema: FlightSchema },{ name: User.name, schema: UserSchema },{ name: Notification.name, schema: NotificationSchema },{ name: Booking.name, schema: BookingSchema }]),
  ],
  controllers: [FlightsController],
  providers: [FlightsService,NotificationsService],
  exports: [FlightsService],
})
export class FlightsModule {}
