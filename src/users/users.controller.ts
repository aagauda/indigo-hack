// src/users/users.controller.ts
import { Controller, Get, Post, Body, Param, Put,Request,UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '../schemas/user.schema';
import { AuthGuard } from 'src/Guards/auth.gaurd';

@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() user: User) {
    return this.usersService.create(user);
  }

  @Get("/all")
  async findAll() {
    return this.usersService.findAll();
  }

  @Get()
  async getUser(@Request() req) {
    return this.usersService.findOne(req.user.id);
  }

  @Put('/update')
  async update(@Request() req, @Body() user: User) {
    let userSession=req.user;
    console.log(userSession)
    return this.usersService.update(userSession.id, user);
  }
}
