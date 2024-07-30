"use client";
import BarChart from "@/components/BarChart";
import Card, { CardContent, CardProps } from "@/components/Card";
import PageTitle from "@/components/PageTitle";
import SalesCard, { SalesProps } from "@/components/SalesCard";
import { HouseIcon, UserIcon, Plane } from "lucide-react";
import Image from "next/image";
import axios from 'axios';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { baseUrl } from "../../../../util/config";




interface FlightDetails {
  flight_id: string;
  airline: string;
  status: string
  departure_gate: string
  arrival_gate: string
  scheduled_departure: string; // Use a more specific type if applicable, e.g., Date
  scheduled_arrival: string; // Use a more specific type if applicable, e.g., Date
  actual_departure?: string; // Optional fields
  actual_arrival?: string; // Optional fields
}


interface Booking {
  flight: FlightDetails;
  status: string
  seat_number?: string;
  booking_date?: string; // Use a more specific type if applicable, e.g., Date
}


export default function DashboardApp() {

  const { data: session, status } = useSession();
  let token = session?.user?.tempToken;

  // API states
  const [result, setResult] = useState<Booking[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10); // Or whatever your default page size is
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshInterval, setRefreshInterval] = useState(300000); // Interval in milliseconds (30 seconds)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        console.log(session?.user?.tempToken);
        console.log(session?.user?.id);
        const responseBookings = await axios.get(`${baseUrl}/bookings/user/${session?.user?.id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          },
        });

        console.log(responseBookings);

        setResult(responseBookings.data); // Adjust based on your API response structure
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData(); // Initial fetch

    const intervalId = setInterval(fetchData, refreshInterval); // Set up interval for fetching data

    return () => clearInterval(intervalId); // Clear interval on component unmount
  }, [session, refreshInterval]); // Dependencies include session and refreshInterval

  console.log(result);

  return (
    <div className="flex flex-col gap-5 w-full ">
       <p className="p-4 font-semibold text-center bg-red-800 text-white rounded-lg">Please note this is a simulation and the flight data you can update the flight status via the admin credentials !!</p>
      <PageTitle title="Your Bookings" />

      {loading ? (
        <p className="p-4 font-semibold">Please Wait...</p>
      ) : (
        <>
          {result.length === 0 ? (
            <p className="p-4 font-semibold text-center">Please book your first flight!</p>
          ) : (
            <section className="grid w-full grid-cols-1 gap-4 gap-x-8 transition-all sm:grid-cols-2 xl:grid-cols-2">
              {result.map((data, index) => (
                <Card
                  key={index}
                  icon={Plane}
                  label={`${data?.flight?.airline}`}
                  bookingStatus={data?.status}
                  seat_number={data?.seat_number}
                  booking_date={data?.booking_date}
                  flight_id={data?.flight?.flight_id}
                  flightStatus={data?.flight?.status}
                  departure_gate={data?.flight?.departure_gate}
                  arrival_gate={data?.flight?.arrival_gate}
                  scheduled_departure={data?.flight?.scheduled_departure}
                  scheduled_arrival={data?.flight?.scheduled_arrival}
                  actual_departure={data?.flight?.actual_departure}
                  actual_arrival={data?.flight?.actual_arrival}
                />
              ))}
            </section>
          )}
        </>
      )}
    </div>
  );
}
