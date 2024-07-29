import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { format, differenceInMilliseconds } from 'date-fns';

export type CardProps = {
  label: string;
  icon: LucideIcon;
  bookingStatus: string;
  seat_number?: string;
  booking_date?: string;
  flight_id: string;
  flightStatus: string;
  departure_gate?: string;
  arrival_gate?: string;
  scheduled_departure: string;
  scheduled_arrival: string;
  actual_departure?: string;
  actual_arrival?: string;
};

// Function to format date into 12-hour format
function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      throw new Error('Invalid date');
    }
    return format(date, 'dd/MM/yyyy hh:mm a');
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Invalid date'; // or return an empty string or any placeholder
  }
}

// Function to calculate remaining time
function getRemainingTime(dateString: string): string {
  const targetDate = new Date(dateString);
  const now = new Date();
  const diffInMs = differenceInMilliseconds(targetDate, now);
  
  if (diffInMs <= 0) return '00:00:00';

  const hours = Math.floor(diffInMs / (1000 * 60 * 60));
  const minutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diffInMs % (1000 * 60)) / 1000);

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

export default function Card(props: CardProps) {
  const [departureCountdown, setDepartureCountdown] = useState<string>('');
  const [arrivalCountdown, setArrivalCountdown] = useState<string>('');
  const [countdownTitle, setCountdownTitle] = useState<string>('');

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      const departureDate = new Date(props.scheduled_departure);
      const arrivalDate = new Date(props.scheduled_arrival);
      
      if (props.flightStatus === 'Cancelled') {
        setDepartureCountdown('Flight Cancelled');
        setArrivalCountdown('Flight Cancelled');
        setCountdownTitle('Flight Cancelled');
      } else if (props.flightStatus === 'Delayed') {
        setDepartureCountdown(getRemainingTime(props.actual_departure || props.scheduled_departure));
        setArrivalCountdown(getRemainingTime(props.actual_arrival || props.scheduled_arrival));
        setCountdownTitle('Updated Departure & Arrival Countdown');
      } else {
        setDepartureCountdown(getRemainingTime(props.scheduled_departure));
        setArrivalCountdown(getRemainingTime(props.scheduled_arrival));
        setCountdownTitle('Scheduled Departure & Arrival Countdown');
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [props.scheduled_departure, props.scheduled_arrival, props.actual_departure, props.actual_arrival, props.flightStatus]);

  return (
    <div className='w-full flex flex-col gap-6'>
      {/* Flight ID */}
      <div className='bg-gray-200 p-2 rounded-t-lg text-center shadow-md'>
        <p className='text-lg font-semibold text-gray-800'>Flight ID: <span className='font-bold'>{props.flight_id}</span></p>
      </div>
      {/* Countdown Banner */}
      <div className={`bg-${props.flightStatus === 'Cancelled' ? 'red-600' : 'indigo-600'} text-black text-center py-2 rounded-t-lg shadow-md`}>
        <h3 className='text-lg font-semibold'>{countdownTitle}</h3>
        {props.flightStatus === 'Cancelled' ? (
          <div className='text-xl font-bold'>
            <p>{departureCountdown}</p>
          </div>
        ) : (
          <div className='flex justify-center mt-1'>
            <p className='text-xl font-bold'>{`Departure: ${departureCountdown}`}</p>
            <span className='mx-2 text-xl font-bold'>|</span>
            <p className='text-xl font-bold'>{`Arrival: ${arrivalCountdown}`}</p>
          </div>
        )}
      </div>
      {/* Main Card Content */}
      <CardContent>
        <section className='relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-lg border border-gray-200 shadow-md'>
          {/* label and icon */}
          <div className='flex items-center gap-3'>
            <props.icon className='h-8 w-8 text-blue-600' />
            <p className='text-2xl font-bold text-gray-800'>{props.label}</p>
          </div>
          {/* booking status */}
          <h2 className={`text-base font-semibold rounded-full px-4 py-1 ${props.bookingStatus === 'Confirmed' ? 'bg-green-600 text-white' : 'bg-gray-800 text-white'}`}>
            {props.bookingStatus}
          </h2>
        </section>
        <section className='mt-6 flex flex-col gap-4'>
          {/* Flight Status Badge */}
          <div className='flex items-center gap-4 bg-gray-100 p-4 rounded-lg shadow-md'>
            <div className={`h-4 w-4 rounded-full ${props.flightStatus === 'Delayed' ? 'bg-red-600' : props.flightStatus === 'Cancelled' ? 'bg-gray-600' : 'bg-green-600'}`} />
            <p className={`text-base font-semibold ${props.flightStatus === 'Delayed' ? 'text-red-600' : props.flightStatus === 'Cancelled' ? 'text-gray-600' : 'text-green-600'}`}>
              {props.flightStatus}
            </p>
          </div>
          {/* Departure, Arrival Gates & Seat Number */}
          {(props.departure_gate || props.arrival_gate || props.seat_number) && (
            <div className='flex flex-col sm:flex-row justify-between gap-6 bg-gray-100 p-4 rounded-lg shadow-md'>
              {props.departure_gate && (
                <div className='flex flex-col items-start'>
                  <p className='text-base text-gray-700'>Departure Gate:</p>
                  <p className='text-lg font-medium text-gray-900'>{props.departure_gate}</p>
                </div>
              )}
              {props.arrival_gate && (
                <div className='flex flex-col items-start'>
                  <p className='text-base text-gray-700'>Arrival Gate:</p>
                  <p className='text-lg font-medium text-gray-900'>{props.arrival_gate}</p>
                </div>
              )}
              {props.seat_number && (
                <div className='flex flex-col items-start'>
                  <p className='text-base text-gray-700'>Seat:</p>
                  <p className='text-lg font-medium text-gray-900'>{props.seat_number}</p>
                </div>
              )}
            </div>
          )}
          {/* Scheduled and Actual Times */}
          {(props.scheduled_departure || props.scheduled_arrival || props.actual_departure || props.actual_arrival) && (
            <div className='bg-gray-100 p-4 rounded-lg shadow-md'>
              <h3 className='text-lg font-semibold text-gray-800 mb-4'>Times</h3>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                {props.scheduled_departure && (
                  <div className='flex flex-col'>
                    <p className='text-base text-gray-700'>Scheduled Departure:</p>
                    <p className='text-base font-medium text-gray-900'>{formatDate(props.scheduled_departure).split(' ')[0]}</p>
                    <p className='text-lg font-medium text-gray-900'>{formatDate(props.scheduled_departure).split(' ')[1]}</p>
                  </div>
                )}
                {props.actual_departure && (
                  <div className='flex flex-col'>
                    <p className='text-base text-gray-700'>Actual Departure:</p>
                    <p className='text-base font-medium text-gray-900'>{formatDate(props.actual_departure).split(' ')[0]}</p>
                    <p className='text-lg font-medium text-gray-900'>{formatDate(props.actual_departure).split(' ')[1]}</p>
                  </div>
                )}
                {props.scheduled_arrival && (
                  <div className='flex flex-col'>
                    <p className='text-base text-gray-700'>Scheduled Arrival:</p>
                    <p className='text-base font-medium text-gray-900'>{formatDate(props.scheduled_arrival).split(' ')[0]}</p>
                    <p className='text-lg font-medium text-gray-900'>{formatDate(props.scheduled_arrival).split(' ')[1]}</p>
                  </div>
                )}
                {props.actual_arrival && (
                  <div className='flex flex-col'>
                    <p className='text-base text-gray-700'>Actual Arrival:</p>
                    <p className='text-base font-medium text-gray-900'>{formatDate(props.actual_arrival).split(' ')[0]}</p>
                    <p className='text-lg font-medium text-gray-900'>{formatDate(props.actual_arrival).split(' ')[1]}</p>
                  </div>
                )}
              </div>
            </div>
          )}
          {/* Booking Date */}
          {props.booking_date && (
            <p className='text-base text-gray-700'>Booking Date: <span className='font-medium text-gray-900'>{formatDate(props.booking_date)}</span></p>
          )}
        </section>
      </CardContent>
    </div>
  );
}

// Wrapper component for CardContent
export function CardContent(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...props}
      className={cn('w-full flex flex-col gap-6 rounded-lg border p-6 shadow-md', props.className)} />
  );
}
