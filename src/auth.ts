import NextAuth from "next-auth";

import credentials from "next-auth/providers/credentials";
import { User } from "./models/userModel";
import axios from "axios";
import { baseUrl } from "./util/config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    credentials({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email"
        },
        password: {
          label: "Password",
          type: "password"
        }
      },
      authorize: async (credentials: any): Promise<any> => {
        // ** connect the database first. {here mongodb in this case}
        // here use the zod for the validations
        // here write the logic for the next auth validations
        // can use the find user from the model of mongoose or any other adapter
        try {
          let email = credentials.email;
          let password = credentials.password;

          if (email == "admin@indigo.com" && password == "admin123") {
            return {
              id: 1,
              email: "admin@indigo.com",
              // tempToken: result.data.token
            }
          }

          const url = baseUrl + "/auth/signin";
          let payload = {
            email: email,
            password: password
          }
          const response = await axios.post(url, payload);

          const result = await response.data;

          return {
            id: result.data._id,
            email: result.data.email,
            tempToken: result.data.token
          }
        } catch (error: any) {
          throw new Error(error)
        }

      },
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.tempToken = user.tempToken;
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.tempToken = token.tempToken;
      }
      return session
    },
  },

  pages: {
    signIn: "/auth/login",
  },
  session: {
    strategy: "jwt"
  },
  secret: process.env.AUTH_SECRET,

})
