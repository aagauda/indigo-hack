"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import axios from 'axios';
import { baseUrl } from "../../../../../util/config";
// Schema for form validation
const ProfileFormSchema = z.object({
  name: z.string().nonempty("Name is required"),
  phone_number: z.string()
    .nonempty("Phone number is required")
    .min(10, "Phone number must be at least 10 digits")
    .max(10, "Phone number must be at most 10 digits"),
});

type ProfileFormValues = z.infer<typeof ProfileFormSchema>;

export default function ProfileForm() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  
  // Initialize form
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(ProfileFormSchema),
    defaultValues: {
      name: "",
      phone_number: "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (status === "authenticated") {
      async function fetchUserData() {
        try {
          const response = await axios.get(`${baseUrl}/users/`, {
            headers: {
              Authorization: `Bearer ${session.user.tempToken}`
            }
          });
          const userData = response.data;

          form.reset({
            name: userData.name || "",
            phone_number: userData.phone || "",
          });
        } catch (error) {
          console.error('Error fetching user data:', error);
          toast({
            duration: 3000,
            title: "Fetch Failed",
            description: "Unable to fetch user data.",
          });
        }
      }

      fetchUserData();
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
      const response = await axios.put(`${baseUrl}/users/update`, {
        name: data.name,
        phone: data.phone_number
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const result = response.data;
      console.log(result);

      if (response.status === 200) {
        toast({
          duration: 3000,
          title: "Profile Updated",
          description: "Your profile has been updated successfully.",
        });

        setTimeout(() => {
          router.replace("/dashboard");
        }, 3000);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      if (axios.isAxiosError(error) && error.response) {
        const { data } = error.response;
        setErrorMessage(data.message || "Profile update failed.");
        toast({
          duration: 3000,
          title: "Update Failed",
          description: data.message || "Please try again later.",
        });
      } else {
        toast({
          duration: 3000,
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
            {/* Input for Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your name" {...field} />
                  </FormControl>
                  <FormDescription>
                    Update your name
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Input for Phone Number */}
            <FormField
              control={form.control}
              name="phone_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your phone number" maxLength={10} {...field} />
                  </FormControl>
                  <FormDescription>
                    Update your phone number
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Updating..." : "Update Profile"}
            </Button>

            {errorMessage && (
              <p className="text-red-600">{errorMessage}</p>
            )}
          </form>
        </Form>
      )}
    </>
  );
}
