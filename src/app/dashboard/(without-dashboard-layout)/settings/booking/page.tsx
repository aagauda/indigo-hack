"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

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
import { baseUrl } from "../../../../../util/config";

// Sample data arrays
const flightNumbers = ['6E 2341', '6E 2342', '6E 2343'];
const seatNumbers = ['12A', '14B', '16C'];

const ProfileFormSchema = z.object({
  flight_id: z.string().nonempty("Flight ID is required"),
  seat_number: z.string().nonempty("Seat number is required"),
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
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (status === "authenticated") {
      form.reset({
        flight_id: "",
        seat_number: "",
      });
    }
  }, [status, session, form]);

  async function onSubmit(data: ProfileFormValues) {
    console.log(data);

    if (!session?.user?.tempToken) {
      toast({
        duration: 1000,
        title: "Authentication Error",
        description: "Unable to authenticate user.",
      });
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const token = session.user.tempToken;
      const response = await axios.post(`${baseUrl}/bookings`, {
        flight_id: data.flight_id,
        seat_number: data.seat_number,
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      });

      const result = response.data;
      console.log(result);

      if (response.status >= 200 && response.status < 300) {  // Handle various success statuses
        // if(true){
        toast({
          duration: 2000,
          title: "Booking Successful",
          description: "Your flight is Booked Successfully",
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
          title: "Booking Failed",
          description: "You have already booked the flight"
          // (
          //   <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          //     <code className="text-white">{JSON.stringify(data, null, 2)}</code>
          //   </pre>
          // )
          ,
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

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Booking..." : "Book Ticket"}
            </Button>

            {/* {errorMessage && (
              <p className="text-red-600">{errorMessage}</p>
            )} */}
          </form>
        </Form>
      )}
    </>
  );
}
