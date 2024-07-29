import * as z from "zod";

// this is the schema cum validator for the login 
export const LoginSchema = z.object({
  email: z.string()
    .email({
      message: "Email is not proper"
    }),
  password: z.string()
    .min(8, { message: "Password must be at least 8 characters long" })
    // .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
    // .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
    // .regex(/[0-9]/, { message: "Password must contain at least one number" })
    // .regex(/[^A-Za-z0-9]/, { message: "Password must contain at least one special character" })
});

// this is schema cum validator for the register 
export const RegisterSchema = z.object({
  email: z.string()
    .email({
      message: "Email is not proper"
    }),
  password: z.string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[^A-Za-z0-9]/, { message: "Password must contain at least one special character" }),

  name: z.string({
    message: "Name is required"
  })
    .max(30, { message: "The names should not exceed 30 characters" }),


  phoneNumber: z.string()
    .regex(/^\d{10}$/, { message: "The phone number should be exactly 10 digits" })
})