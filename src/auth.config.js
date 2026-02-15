// src/auth.config.js
import Google from "next-auth/providers/google"
import GitHub from "next-auth/providers/github"
import Discord from "next-auth/providers/discord"
import Credentials from "next-auth/providers/credentials"

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
    Credentials({}),
  ],
}