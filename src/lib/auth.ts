import { type NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
// import GitHubProvider from 'next-auth/providers/github'
import { DrizzleAdapter } from '@auth/drizzle-adapter'
import db from '@/database'

export const authOptions = {
  adapter: DrizzleAdapter(db),
  // session: {
  //   strategy: 'jwt',
  // },
  // pages: {
  //   signIn: '/signin',
  // },
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
  },
} satisfies NextAuthOptions
