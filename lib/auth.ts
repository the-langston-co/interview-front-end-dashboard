import NextAuth, { CredentialsSignin, NextAuthConfig } from 'next-auth';
import GitHub from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import { getUserByCredentials } from '@/lib/db.mock';
import { z } from 'zod';

export class CredentialsError extends CredentialsSignin {
  code = 'invalid_credentials';
}

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4)
});

export const nextAuthConfig: NextAuthConfig = {
  providers: [
    GitHub,
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        const parsed = credentialsSchema.parse(credentials);
        const user = await getUserByCredentials(parsed);
        if (user) {
          return { ...user, id: `${user.id}` };
        }
        throw new CredentialsError('Incorrect email or password.');
      }
    })
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.picture = user.avatar_url;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user && token.role) {
        session.user.role = token.role;
        session.user.avatar_url = token.picture ?? null;
      }

      return session;
    }
  }
};

export const { handlers, signIn, signOut, auth } = NextAuth(nextAuthConfig);
