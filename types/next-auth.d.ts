import { DefaultJWT } from 'next-auth/jwt';

type UserRole = 'admin' | 'customer';

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT extends DefaultJWT {
    role?: UserRole;
  }
}

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      id: number;
      email: string;
      password: string;
      first_name: string | null;
      last_name: string | null;
      avatar_url: string | null;
      role: UserRole;
    };
  }
}
