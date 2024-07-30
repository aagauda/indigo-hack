import NextAuth from "next-auth";

import credentials from "next-auth/providers/credentials";
import { User } from "./models/userModel";
import axios from "axios";
import { baseUrl } from "./util/config";
// import { AdapterUser, AdapterSession } from 'next-auth/adapters';
// import { JWT } from 'next-auth/jwt';
// interface Token {
//   id?: string;
//   email?: string;
//   tempToken?: string;
// }

// interface SessionUser extends AdapterUser {
//   id?: string;
//   email?: string;
//   tempToken?: string;
// }

// interface Session extends AdapterSession {
//   user: SessionUser;
// }

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
    async session({ session, token }:any) {
      if (token) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.tempToken = token.tempToken as string;
      }
      return session
    },
  },

  pages: {
    signIn: "/auth/login",
    signOut: "/auth/signout"
  },
  session: {
    strategy: "jwt"
  },
  secret:"d75siW33X46008XS1ImAnKPFCOrV1nU6MPL04PLDsHE=",

})
