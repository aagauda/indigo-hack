// src/bookings/bookings.controller.ts
import { Controller, Get, Post, Body, Param, Put, UseGuards, Request } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { Booking } from '../schemas/booking.schema';
import { CreateBookingDto } from './dto/create-booking.dto';
import { AuthGuard } from 'src/Guards/auth.gaurd';

@UseGuards(AuthGuard)
@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  async create(@Request() req,@Body() booking: CreateBookingDto) {
    let sessionUser=req.user;
    return this.bookingsService.createBooking(booking,sessionUser.id);
  }

  @Get()
  async findAll() {
    return this.bookingsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.bookingsService.findOne(id);
  }

  @Get('/user/:id')
  async findUserBooking(@Param('id') id: string) {
    return this.bookingsService.findUserBooking(id);
  }

  

  @Put(':id')
  async update(@Param('id') id: string, @Body() booking: Booking) {
    return this.bookingsService.update(id, booking);
  }
}
