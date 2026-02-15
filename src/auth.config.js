// src/auth.config.js
import Google from "next-auth/providers/google"
import GitHub from "next-auth/providers/github"
import Discord from "next-auth/providers/discord"
import Credentials from "next-auth/providers/credentials"
import prisma from "@/lib/prisma"
import bcrypt from "bcryptjs"

export default {
  providers: [
    Google({
      authorization: {
        params: {
          prompt: "select_account",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    GitHub({
      authorization: {
        params: {
          prompt: "select_account",
        },
      },
    }),
    Discord({
      authorization: {
        params: {
          prompt: "select_account",
        },
      },
    }),
    Credentials({
      async authorize(credentials) {
        const { email, password } = credentials;
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user || !user.password) return null;

        const passwordsMatch = await bcrypt.compare(password, user.password);
        if (passwordsMatch) return user;
        
        return null;
      },
    }),
  ],
}