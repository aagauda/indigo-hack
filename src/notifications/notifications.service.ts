// src/notifications/notifications.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Notification, NotificationDocument } from '../schemas/notification.schema';

@Injectable()
export class NotificationsService {
  constructor(@InjectModel(Notification.name) private notificationModel: Model<NotificationDocument>) {}

  async create(notification: any): Promise<Notification> {
    const createdNotification =await this.notificationModel.create(notification);
    return createdNotification
  }

  async findAll(): Promise<Notification[]> {
    return this.notificationModel.find().exec();
  }

  async findOne(id: string): Promise<Notification> {
    return this.notificationModel.findOne({ notification_id: id }).exec();
  }

  async findNotificationsByFlightId(id:string){
    return this.notificationModel.findOne({ notification_id: id }).exec();
  }

  async deleteExpiredNotifications(): Promise<void> {
    const now = new Date();
    await this.notificationModel.deleteMany({ timestamp: { $lt: now } }).exec();
  }
}
