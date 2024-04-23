import userLogIn from '@/libs/userLogIn';
import NextAuth from 'next-auth';
import { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
 
export const authOptions: AuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if(!credentials?.email || !credentials?.password){
          throw new Error('Invalid credentials (1)')
        }

        const user = await userLogIn(credentials.email, credentials.password)

        if (user) {
          return user
        } else {
          throw new Error('Invalid credentials (4)')
        }
      }
    })
  ],
  pages: {
    signIn: '/',
  },
  debug: process.env.NODE_ENV === 'development',
  session: { 
    strategy:'jwt'
  },
  secret: process.env.NEXTAUTH_SECRET,
  // callback for more data 
  callbacks:{
    async jwt({token, user}) {
      return {...token, ...user}
    },
    async session({session, token, user}) {
      session.user = token as any
      return session
    }
  }
}

const handler = NextAuth(authOptions)
export {handler as GET ,handler as POST};