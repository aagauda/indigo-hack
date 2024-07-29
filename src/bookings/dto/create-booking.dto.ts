import { IsString, IsNotEmpty, IsDate } from 'class-validator';

export class CreateBookingDto {

  @IsString()
  @IsNotEmpty()
  flight_id: string;

  @IsString()
  @IsNotEmpty()
  seat_number: string;
}
