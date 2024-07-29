"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import axios from 'axios';
import { baseUrl } from "../../../../util/config";

// Sample data arrays
const flightNumbers = ['6E 2341', '6E 2342', '6E 2343'];
const seatNumbers = ['12A', '14B', '16C'];
const statuses = ["On Time", "Delayed", "Cancelled"];
const departureGates = ["A12", "C3", "E2"];
const arrivalGates = ["B7", "D4", "F1"];

const ProfileFormSchema = z.object({
  flight_id: z.string().nonempty("Flight ID is required"),
  seat_number: z.string().nonempty("Seat number is required"),
  status: z.string().nonempty("Status is required"),
  departure_gate: z.string().nonempty("Departure gate is required"),
  arrival_gate: z.string().nonempty("Arrival gate is required"),
  scheduled_departure: z.date().nullable(),
  scheduled_arrival: z.date().nullable(),
  actual_departure: z.date().nullable(),
  actual_arrival: z.date().nullable(),
});

type ProfileFormValues = z.infer<typeof ProfileFormSchema>;

export default function ProfileForm() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(ProfileFormSchema),
    defaultValues: {
      flight_id: "",
      seat_number: "",
      status: "",
      departure_gate: "",
      arrival_gate: "",
      scheduled_departure: null,
      scheduled_arrival: null,
      actual_departure: null,
      actual_arrival: null,
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (status === "authenticated") {
      form.reset({
        flight_id: "",
        seat_number: "",
        status: "",
        departure_gate: "",
        arrival_gate: "",
        scheduled_departure: null,
        scheduled_arrival: null,
        actual_departure: null,
        actual_arrival: null,
      });
    }
  }, [status, session, form]);

  async function onSubmit(data: ProfileFormValues) {
    console.log(data);

    // console.log(session?.user?.tempToken)

    // if (!session?.user?.tempToken) {
    //   toast({
    //     duration: 1000,
    //     title: "Authentication Error",
    //     description: "Unable to authenticate user.",
    //   });
    //   return;
    // }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const token = session.user.tempToken;
      console.log(token)
      const response = await axios.put(`${baseUrl}/flights/${data.flight_id}`, {
        ...data,
        scheduled_departure: data.scheduled_departure?.toISOString(),
        scheduled_arrival: data.scheduled_arrival?.toISOString(),
        actual_departure: data.actual_departure?.toISOString(),
        actual_arrival: data.actual_arrival?.toISOString(),
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      });

      const result = response.data;
      console.log(result);

      if (response.status >= 200 && response.status < 300) {  // Handle various success statuses
        toast({
          duration: 2000,
          title: "Flight Updated Successful",
          description: "Your flight is updated Successfully",
        })

        setTimeout(() => {
          router.replace("/dashboard");
        }, 2000);
      } else {
        toast({
          duration: 2000,
          title: "Unexpected Response",
          description: "The response from the server was not as expected.",
        });
      }
    } catch (error) {
      console.error('Error booking flight:', error);
      if (axios.isAxiosError(error) && error.response) {
        const { data } = error.response;
        setErrorMessage(data.message || "Booking failed.");
        toast({
          duration: 2000,
          title: "Flight Update Failed",
          description: data.message || "You have already updated the flight",
        });
      } else {
        toast({
          duration: 1000,
          title: "An error occurred",
          description: "Please try again later.",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  const minDate = new Date();

  return (
    <>
      {status === "loading" || isSubmitting ? (
        <p>Loading...</p>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Dropdown for Flight Number */}
            <FormField
              control={form.control}
              name="flight_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Flight Number</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a flight number" />
                      </SelectTrigger>
                      <SelectContent>
                        {flightNumbers.map((flight) => (
                          <SelectItem key={flight} value={flight}>
                            {flight}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription>
                    Select your flight number
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Dropdown for Seat Number */}
            <FormField
              control={form.control}
              name="seat_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Seat Number</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a seat number" />
                      </SelectTrigger>
                      <SelectContent>
                        {seatNumbers.map((seat) => (
                          <SelectItem key={seat} value={seat}>
                            {seat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription>
                    Select your seat number
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Dropdown for Status */}
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a status" />
                      </SelectTrigger>
                      <SelectContent>
                        {statuses.map((status) => (
                          <SelectItem key={status} value={status}>
                            {status}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription>
                    Select the status of your flight
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Dropdown for Departure Gate */}
            <FormField
              control={form.control}
              name="departure_gate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Departure Gate</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a departure gate" />
                      </SelectTrigger>
                      <SelectContent>
                        {departureGates.map((gate) => (
                          <SelectItem key={gate} value={gate}>
                            {gate}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription>
                    Select your departure gate
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Dropdown for Arrival Gate */}
            <FormField
              control={form.control}
              name="arrival_gate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Arrival Gate</FormLabel>
                  <FormControl >
                    <Select onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an arrival gate" />
                      </SelectTrigger>
                      <SelectContent>
                        {arrivalGates.map((gate) => (
                          <SelectItem key={gate} value={gate}>
                            {gate}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription>
                    Select your arrival gate
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Date Picker for Scheduled Departure */}
            <FormField
              control={form.control}
              name="scheduled_departure"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Scheduled Departure&nbsp;&nbsp;</FormLabel>
                  <FormControl className="border-2 border-gray-300 p-2 rounded-lg">
                    <DatePicker
                      selected={field.value}
                      onChange={field.onChange}
                      showTimeSelect
                      dateFormat="Pp"
                      minDate={minDate}
                    />
                  </FormControl>
                  <FormDescription>
                    Select your scheduled departure date and time
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Date Picker for Scheduled Arrival */}
            <FormField
              control={form.control}
              name="scheduled_arrival"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Scheduled Arrival&nbsp;&nbsp;</FormLabel>
                  <FormControl className="border-2 border-gray-300 p-2 rounded-lg">
                    <DatePicker
                      selected={field.value}
                      onChange={field.onChange}
                      showTimeSelect
                      dateFormat="Pp"
                      minDate={minDate}
                    />
                  </FormControl>
                  <FormDescription>
                    Select your scheduled arrival date and time
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Date Picker for Actual Departure */}
            <FormField
              control={form.control}
              name="actual_departure"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Actual Departure&nbsp;&nbsp;</FormLabel>
                  <FormControl className="border-2 border-gray-300 p-2 rounded-lg">
                    <DatePicker
                      selected={field.value}
                      onChange={field.onChange}
                      showTimeSelect
                      dateFormat="Pp"
                      minDate={minDate}
                    />
                  </FormControl>
                  <FormDescription>
                    Select your actual departure date and time
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Date Picker for Actual Arrival */}
            <FormField
              control={form.control}
              name="actual_arrival"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Actual Arrival&nbsp;&nbsp;</FormLabel>
                  <FormControl className="border-2 border-gray-300 p-2 rounded-lg">
                    <DatePicker
                      selected={field.value}
                      onChange={field.onChange}
                      showTimeSelect
                      dateFormat="Pp"
                      minDate={minDate}
                    />
                  </FormControl>
                  <FormDescription>
                    Select your actual arrival date and time
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isSubmitting}>
              Submit
            </Button>
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          </form>
        </Form>
      )}
    </>
  );
}
