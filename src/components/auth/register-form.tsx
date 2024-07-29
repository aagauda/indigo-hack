"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { RegisterSchema } from "@/schemas/auth.schema";
import { CardContent } from "../Card";
import PageTitle from "../PageTitle";
import { baseUrl } from "@/util/config";

// API call function
const registerUser = async (values: z.infer<typeof RegisterSchema>) => {
  try {
    values.phone = values.phoneNumber;
    const response = await fetch(`${baseUrl}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Registration failed.");
    }
    return { success: "Profile created successfully. Please login." };
  } catch (error) {
    return { error: (error as Error).message };
  }
};

export const RegisterForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
      phone: ""
    }
  });

  const onSubmit = async (values: z.infer<typeof RegisterSchema>) => {
    setError("");
    setSuccess("");

    startTransition(async () => {
      const result = await registerUser(values);
      if (result.error) {
        setError(result.error);
      } else {
        setSuccess(result.success);
        toast({
          duration: 3000,
          title: "Registration Successful",
          description: result.success,
        });
        router.push("/auth/login");
      }
    });
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-blue-900 to-blue-600 text-white p-8">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>

      <div className="relative z-10 flex flex-col gap-5 max-w-lg mx-auto">
        <PageTitle title="Register" className="text-center text-4xl font-bold mb-6" />

        <section className="flex flex-col gap-2">
          {error && <p className="p-4 font-semibold text-red-600">{error}</p>}
          {success && <p className="p-4 font-semibold text-green-600">{success}</p>}

          <CardContent className="bg-white text-black rounded-lg shadow-lg p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-4">
                  <FormField
                    name="name"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">Name</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Please Enter your name"
                            type="text"
                            className="bg-gray-100 border-gray-300 text-gray-700"
                            disabled={isPending}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    name="phoneNumber"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">Phone Number</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Please Enter your phone number"
                            type="text" // Changed from type="number" to type="text" for phone numbers
                            className="bg-gray-100 border-gray-300 text-gray-700"
                            disabled={isPending}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    name="email"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">Email</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Please Enter your Email"
                            type="email"
                            className="bg-gray-100 border-gray-300 text-gray-700"
                            disabled={isPending}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    name="password"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">Password</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Please Enter your password"
                            type="password"
                            className="bg-gray-100 border-gray-300 text-gray-700"
                            disabled={isPending}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button type="submit" className="w-full bg-green-500 hover:bg-green-600" disabled={isPending}>
                  Register
                </Button>
              </form>
            </Form>
          </CardContent>
        </section>
      </div>
    </div>
  );
};
