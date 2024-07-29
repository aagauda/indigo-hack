"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Form, FormField, FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { LoginSchema } from "@/schemas/auth.schema";
import { LoginAction } from "@/actions/login";
import { CardContent } from "../Card";
import PageTitle from "../PageTitle";

export const LoginForm = () => {
  const router = useRouter();

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, setTransition] = useTransition();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");

    setTransition(() => {
      LoginAction(values).then((data) => {
        if (data.success) {
          setSuccess(data.success + " Please Wait");
          router.refresh();
        }
        setError(data.error);
      });
    });
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-blue-900 to-blue-600 text-white p-8">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>

      <div className="relative z-10 flex flex-col gap-5 max-w-lg mx-auto">
        <PageTitle title="Login" className="text-center text-4xl font-bold mb-6" />

        <section className="flex flex-col gap-2">
          {error ? (
            <p className="p-4 font-semibold text-red-500">{error}</p>
          ) : success ? (
            <p className="p-4 font-semibold text-green-500">{success}</p>
          ) : null}

          <CardContent className="bg-white text-black rounded-lg shadow-lg p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-4">
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
                            placeholder="Please Enter your Password"
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
                  Login
                </Button>
              </form>
            </Form>
          </CardContent>
        </section>
      </div>
    </div>
  );
};
