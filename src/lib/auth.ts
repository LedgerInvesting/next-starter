import { type DefaultSession, type NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
// import GitHubProvider from 'next-auth/providers/github'
import { DrizzleAdapter } from '@auth/drizzle-adapter'
import db from '@/database'
import { createTable } from '@/database/schema/auth'
import { pgTableCreator } from 'drizzle-orm/pg-core'

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string
      // ...other properties
      // role: UserRole;
    } & DefaultSession['user']
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

export const authOptions = {
  // @ts-ignore
  adapter: DrizzleAdapter(db, createTable), // TODO: try implement custom adapter https://github.com/miljan-code/drizzle-next-auth/blob/main/lib/auth/drizzle-adapter.ts
  // session: {
  //   strategy: 'jwt',
  // },
  pages: {
    signIn: '/signin',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    // GitHubProvider({
    //   clientId: process.env.GITHUB_CLIENT_ID,
    //   clientSecret: process.env.GITHUB_CLIENT_SECRET,
    // }),
  ],
  callbacks: {
    async signIn({ account, profile, ...other }) {
      if (account.provider === 'google') {
        // return profile.email_verified && profile.email.endsWith('@example.com')
      }
      return true // Do different verification for other providers that don't have `email_verified`
    },
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
      },
    }),
  },
} satisfies NextAuthOptions
