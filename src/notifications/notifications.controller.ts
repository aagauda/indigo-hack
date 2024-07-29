// src/notifications/notifications.controller.ts
import { Controller, Get, Post, Body } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { Notification } from '../schemas/notification.schema';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post()
  async create(@Body() notification: Notification) {
    return this.notificationsService.create(notification);
  }

  @Get()
  async findAll() {
    return this.notificationsService.findAll();
  }
}
