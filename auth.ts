import NextAuth from "next-auth";

import GitHub from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

import { prisma } from "@/lib/prisma";

import { compare } from "bcryptjs";

import { User } from "@prisma/client";

type UserWithPassword = User & { password: string };

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub,
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: { email: string; password: string }) {
        if (!credentials) return null;

        const { email, password } = credentials;

        // Buscar el usuario en la base de datos
        const user = (await prisma.user.findUnique({
          where: { email },
        })) as UserWithPassword | null;

        if (!user) {
          throw new Error("Invalid email or password");
        }

        // Validar la contraseña
        const isValidPassword = await compare(password, user.password);
        if (!isValidPassword) {
          throw new Error("Invalid email or password");
        }

        // Retornar los datos del usuario
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      const email = user.email!;
      const name = user.name!;
      await prisma.user.upsert({
        where: { email },
        update: {},
        create: { email, name, role: "USER" },
      });
      return true;
    },
    async session({ session, token }: { session: any; token: any }) {
      if (token?.role) {
        session.user.role = token.role;
      }
      return session;
    },
    async jwt({ token, user }: { token: any; user?: any }) {
      if (user) {
        const dbUser = await prisma.user.findUnique({
          where: { email: user.email },
        });

        token.role = dbUser?.role || "USER";
      }
      return token;
    },
  },
  secret: process.env.AUTH_SECRET!,
  session: {
    strategy: "jwt", // Usamos JWT para manejar sesiones
  },
  pages: {
    signIn: "/auth/login", // Página personalizada de inicio de sesión
    error: "/auth/unauthorized", // Página personalizada de error
  },
});
