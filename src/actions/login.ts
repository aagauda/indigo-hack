"use server";

import * as z from "zod";
import { LoginSchema } from "@/schemas/auth.schema";
import { cookies } from "next/headers";
import { signIn } from "@/auth";

export const LoginAction = async (values: z.infer<typeof LoginSchema>) => {
  // here we will validate the values before passing in the api or doing the fullstack logic here
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: "Invalid Credentials"
    }
  }

  // here we will recive the data of the payload to pass to api or the fullstack logic here

  try {
    // here we are calling the next auth signin function
    let signInSuccess=await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    return {
      success:"Login Success"
    }
  } catch (error) {
    console.log(error)
    return {
      error: "Invalid Credentials"
    }

  }





}