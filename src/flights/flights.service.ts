// src/flights/flights.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Flight, FlightDocument } from '../schemas/flight.schema';
import { User, UserDocument } from '../schemas/user.schema';
import { NotificationsService } from '../notifications/notifications.service';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Booking, BookingDocument } from 'src/schemas/booking.schema';
const nodemailer=require("nodemailer")

const flightData = [
  {
    flight_id: "6E 2341",
    airline: "Indigo",
    status: "On Time",
    departure_gate: "A12",
    arrival_gate: "B7",
    scheduled_departure: new Date("2024-07-26T14:00:00Z"),
    scheduled_arrival: new Date("2024-07-26T18:00:00Z"),
    actual_departure: null,
    actual_arrival: null
  },
  {
    flight_id: "6E 2342",
    airline: "Indigo",
    status: "Delayed",
    departure_gate: "C3",
    arrival_gate: "D4",
    scheduled_departure: new Date("2024-07-26T16:00:00Z"),
    scheduled_arrival: new Date("2024-07-26T20:00:00Z"),
    actual_departure: null,
    actual_arrival: null
  },
  {
    flight_id: "6E 2343",
    airline: "Indigo",
    status: "Cancelled",
    departure_gate: "E2",
    arrival_gate: "F1",
    scheduled_departure: new Date("2024-07-26T12:00:00Z"),
    scheduled_arrival: new Date("2024-07-26T16:00:00Z"),
    actual_departure: null,
    actual_arrival: null
  }
];

const statuses = ["On Time", "Delayed", "Cancelled"];
const departureGates = ["A12", "C3", "E2"];
const arrivalGates = ["B7", "D4", "F1"];

@Injectable()
export class FlightsService {
  private readonly logger = new Logger(FlightsService.name);

  constructor(
    @InjectModel(Flight.name) private flightModel: Model<FlightDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Booking.name) private bookingModel: Model<BookingDocument>,
    private readonly notificationsService: NotificationsService
  ) { }

  async create() {
    let insertedFlights = await this.flightModel.insertMany(flightData);
    return insertedFlights
  }

  async findAll() {
    return await this.flightModel.find().exec();
  }

  async findOne(id: string): Promise<Flight> {
    return this.flightModel.findOne({ flight_id: id }).exec();
  }

  async update(id: string, flight: Flight) {
    // Step 1: Find and update the flight
    const response = await this.flightModel.findOneAndUpdate(
        { flight_id: id },
        flight,
        { new: true }
    ).exec();

    if (!response) {
        throw new Error('Flight not found');
    }

    // Step 2: Find all bookings for the flight ID
    const bookings = await this.bookingModel.find({ flight_id: id })
        .populate('user')
        .exec();

    // Extract email addresses and phone numbers from populated users
    const userDetails = bookings
        .map(booking => booking.user)
        .filter(user => user != null)
        .map(user => ({
            email: (user as any).email,
            phone: (user as any).phone // Adjust property name as needed
        }));

    // Extract arrays of emails
    const emailAddresses = userDetails.map(details => details.email);

    // Compose email content based on flight status
    let message: string;

    switch (response.status) {
        case 'On Time':
            message = `Your flight ${response.flight_id} is on time. Departure gate: ${response.departure_gate}.`;
            break;
        case 'Delayed':
            message = `Your flight ${response.flight_id} is delayed. New departure time: ${response.scheduled_departure.toISOString()}. Departure gate: ${response.departure_gate}.`;
            break;
        case 'Cancelled':
            message = `Your flight ${response.flight_id} has been cancelled.`;
            break;
        default:
            message = `Your flight ${response.flight_id} status is ${response.status}.`;
            break;
    }

    // Compose email content
    const subject = `Flight Update: ${response.flight_id}`;
    const text = `Dear User,\n\n${message}\n\nThank you for your attention.\n\nBest regards,\nAabhash Gauda`;

    // Send email notifications to all users
    for (const email of emailAddresses) {
        await this.sendEmail(email, subject, text);
    }

    return response;
}

// Function to send an email
async sendEmail(to: string, subject: string, text: string) {
    // Create a transporter object using SMTP transport
    const transporter = nodemailer.createTransport({
        service: 'Gmail', // or use another email service provider
        auth: {
            user: process.env.mail, // your email address
            pass: process.env.email_password, // your email password or an app-specific password
        },
    });

    try {
        // Set up email data
        const mailOptions = {
            from: process.env.mail, // sender address
            to:to, // list of receivers
            subject: subject, // Subject line
            text: text, // plain text body
        };

        // Send email
        const info = await transporter.sendMail(mailOptions);

        console.log('Email sent: ' + info.response);
    } catch (error) {
        console.error('Error sending email:', error);
    }
}




  async insertPredefinedFlights(): Promise<Flight[]> {
    return this.flightModel.insertMany(flightData);
  }

  private getRandomElement(array: any[]): any {
    return array[Math.floor(Math.random() * array.length)];
  }

  private getRandomFutureDate(): Date {
    const now = new Date();
    const randomMinutes = Math.floor(Math.random() * 720);
    return new Date(now.getTime() + randomMinutes * 60000);
  }

  @Cron(CronExpression.EVERY_30_SECONDS)
  async updateFlightsRandomly() {
    this.logger.log('Cron job started');
    const flights = await this.flightModel.find().exec();

    for (const flight of flights) {
      const oldStatus = flight.status;
      flight.status = this.getRandomElement(statuses);
      flight.departure_gate = this.getRandomElement(departureGates);
      flight.arrival_gate = this.getRandomElement(arrivalGates);
      flight.scheduled_departure = this.getRandomFutureDate();
      flight.scheduled_arrival = this.getRandomFutureDate();
      flight.actual_departure = this.getRandomFutureDate();
      flight.actual_arrival = this.getRandomFutureDate();

      await flight.save();
      console.log("Flight data updated");

      if (oldStatus !== flight.status) {
        console.log('Notifying users for flight: ', flight.flight_id);
        await this.notifyUsers(flight);
        console.log('Notification created');
      }
    }
  }




  private async notifyUsers(flight: Flight) {
    console.log('Notifying users for flight: ', flight.flight_id);

    const bookings = await this.bookingModel.find({
      flight_id: flight.flight_id
    }).populate('user').exec();

    console.log('Bookings found: ', bookings);

    for (const booking of bookings) {
      if (booking.user != null) {
        let message;
        switch (flight.status) {
          case 'On Time':
            message = `Your flight ${flight.flight_id} is on time. Departure gate: ${flight.departure_gate}.`;
            break;
          case 'Delayed':
            message = `Your flight ${flight.flight_id} is delayed. New departure time: ${flight.scheduled_departure.toISOString()}. Departure gate: ${flight.departure_gate}.`;
            break;
          case 'Cancelled':
            message = `Your flight ${flight.flight_id} has been cancelled.`;
            break;
          default:
            message = `Your flight ${flight.flight_id} status is ${flight.status}.`;
            break;
        }

        const notification = {
          notification_id: (Math.random() * 100000).toFixed(0),
          flight_id: flight.flight_id,
          message,
          timestamp: new Date(),
          method: "Email",
          recipient: booking.user.email,
          userId: (booking.user as any)._id
        };

        console.log('Creating notification: ', notification);
        await this.notificationsService.create(notification as any);
        console.log(`Notified user ${booking.user.email} about flight ${flight.flight_id}`);
      }
    }
  }


  async updateFlightDetails(flightId: string, updates: Partial<Flight>): Promise<Flight> {
    const updatedFlight = await this.flightModel.findOneAndUpdate(
      { flight_id: flightId },
      updates,
      { new: true }
    ).exec();

    if (!updatedFlight) {
      throw new Error(`Flight with ID ${flightId} not found`);
    }

    return updatedFlight;
  }



  @Cron(CronExpression.EVERY_MINUTE)
  async cleanUpExpiredNotifications() {
    await this.notificationsService.deleteExpiredNotifications();
    console.log('----------Expired notifications cleaned up');
  }




}
