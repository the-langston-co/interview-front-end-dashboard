import { DefaultJWT } from 'next-auth/jwt';

type AppUser = {
  id: number | string;
  email: string;
  password: string;
  first_name: string | null;
  last_name: string | null;
  avatar_url: string | null;
  role: string;
};

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT extends DefaultJWT {
    role?: string;
  }
}

declare module 'next-auth' {
  interface User {
    id: number | string;
    email: string;
    password: string;
    first_name: string | null;
    last_name: string | null;
    avatar_url: string | null;
    role: string;
  }

  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: AppUser;
  }
}
