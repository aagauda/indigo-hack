import "next-auth";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    id?: string;
    tempToken?: string;
  }
  interface Sesssion {
    user: {
      id?: string;
      tempToken?: string;
    } 
  }
  interface JWT{
    id?: string;
    tempToken?: string;
  }
}