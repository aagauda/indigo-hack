import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FlightsModule } from './flights/flights.module';
import { NotificationsModule } from './notifications/notifications.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { BookingsModule } from './bookings/bookings.module';
import { ScheduleModule } from '@nestjs/schedule';
@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async () => ({
        uri: process.env.DB_URL,
        autoIndex: true
      })
    }),
    // ScheduleModule.forRoot(),
    FlightsModule, NotificationsModule, AuthModule, UsersModule, BookingsModule],
  controllers: [AppController],
  providers: [AppService],

})
export class AppModule { }
