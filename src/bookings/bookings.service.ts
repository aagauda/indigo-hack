// src/bookings/bookings.service.ts
import { Injectable, NotFoundException, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Flight, FlightDocument } from 'src/schemas/flight.schema';
import { User, UserDocument } from 'src/schemas/user.schema';
import { Booking, BookingDocument } from '../schemas/booking.schema';
import { CreateBookingDto } from './dto/create-booking.dto';

@Injectable()
export class BookingsService {
  constructor(
    @InjectModel(Booking.name) private bookingModel: Model<BookingDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Flight.name) private flightModel: Model<FlightDocument>,
  ) { }

  async createBooking(createBookingDto: CreateBookingDto, userId: string): Promise<Booking> {
    const { flight_id } = createBookingDto;

    // Check if the user already has a booking for the same flight
    const existingBooking = await this.bookingModel.findOne({ user: userId, flight_id });
    if (existingBooking) {
      throw new BadRequestException('User already has a booking for this flight');
    }

    const booking = new this.bookingModel({
      ...createBookingDto,
      status: "Confirmed",
      booking_date: new Date(), // Set current date as booking date
      user: userId,
    });

    await booking.save();

    // Add booking to user
    await this.userModel.findByIdAndUpdate(userId, { $push: { bookings: booking._id } });

    return booking;
  }


  async findAll(): Promise<Booking[]> {
    return this.bookingModel.find().exec();
  }

  async findOne(id: string): Promise<Booking> {
    return this.bookingModel.findOne({ booking_id: id }).exec();
  }

  async findUserBooking(id: string) {
    // Step 1: Find bookings for the user
    const bookings = await this.bookingModel.find({ user: id }).exec();
    const bookingDetails = [];

    // Step 2: Fetch flight details for each booking
    for (const booking of bookings) {
      const flight = await this.flightModel.findOne({ flight_id: booking.flight_id }).exec();
      if (flight) {
        bookingDetails.push({
          ...booking.toObject(), // Convert Mongoose document to plain JavaScript object
          flight: flight.toObject(),
        });
      } else {
        bookingDetails.push({
          ...booking.toObject(),
          flight: null,
        });
      }
    }

    // console.log(bookingDetails);
    return bookingDetails;
  }

  async update(id: string, booking: Booking): Promise<Booking> {
    return this.bookingModel.findOneAndUpdate({ booking_id: id }, booking, { new: true }).exec();
  }
}
