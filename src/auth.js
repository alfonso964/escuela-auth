// src/auth.js
import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "@/lib/prisma"
import authConfig from "./auth.config"

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  
  // Extendemos authConfig para permitir el enlazado de cuentas por email
  ...authConfig,
  providers: authConfig.providers.map(provider => {
    // Si no es el de credenciales, permitimos unir cuentas con el mismo email
    if (provider.id !== "credentials") {
      return {
        ...provider,
        allowDangerousEmailAccountLinking: true,
      }
    }
    return provider
  }),

  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error',
    newUser: '/auth/register',
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      // 1. Al iniciar sesión, el objeto 'user' viene de la base de datos o provider
      if (user) {
        token.role = user.role;
      } 
      // 2. Si es una sesión activa pero el token no tiene el rol, lo recuperamos
      else if (!token.role && token.sub) {
        const dbUser = await prisma.user.findUnique({
          where: { id: token.sub },
          select: { role: true }
        });
        token.role = dbUser?.role || 'USER'; // Valor por defecto para evitar errores
      }

      // 3. Actualización manual de la sesión
      if (trigger === "update" && session) {
        if (session.name) token.name = session.name;
        if (session.role) token.role = session.role;
      }

      return token;
    },

    async session({ session, token }) {
      // Inyectamos el ID y el Role en el objeto session que ve el cliente (Header, etc)
      if (session.user) {
        session.user.id = token.sub;
        session.user.role = token.role;
      }
      return session;
    },
  },
})