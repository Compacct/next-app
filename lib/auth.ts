import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/db";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "admin",
      name: "Admin",
      credentials: {
        userid: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.userid || !credentials?.password) return null;

        const user = await prisma.admin_users.findFirst({
          where: {
            userid: credentials.userid,
            password: credentials.password,
          },
        });

        if (user) {
          return {
            id: user.id.toString(),
            name: user.userid,
            email: user.email,
            role: "admin",
          };
        }
        return null;
      },
    }),
    CredentialsProvider({
      id: "franchisee",
      name: "Franchisee",
      credentials: {
        code: { label: "Franchisee Code", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.code || !credentials?.password) return null;

        const franchisee = await prisma.wbca_franchisee.findFirst({
          where: {
            franchisee_code: credentials.code,
            password: credentials.password,
            published: "Y",
          },
        });

        if (franchisee) {
          return {
            id: franchisee.franchisee_id.toString(),
            name: franchisee.franchisee_name,
            email: franchisee.email,
            role: "franchisee",
            code: franchisee.franchisee_code,
          };
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
        token.code = (user as any).code;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        (session.user as any).role = token.role;
        (session.user as any).code = token.code;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
