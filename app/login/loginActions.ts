'use server';
import { CredentialsError, signIn, signOut } from '@/lib/auth';
import { sleep } from '@/lib/utils';
import { redirect } from 'next/navigation';

export type LoginState = { message: string | null };

export async function handleLogin(prevState: LoginState, formData: FormData) {
  const email = formData.get('email')?.toString() || '';
  const password = formData.get('password')?.toString() || '';

  await sleep(1000);
  try {
    // Use next-auth credentials sign-in
    const result = await signIn('credentials', {
      redirect: false, // Do not redirect automatically
      email,
      password,
      redirectTo: '/'
    });

    if (result?.error) {
      return { message: 'Incorrect email or password' };
    }
  } catch (error) {
    let message = (error as Error)?.message ?? 'Incorrect email or password';
    if (error instanceof CredentialsError) {
      message = 'Incorrect email or password';
    }

    return {
      message
    };
  }

  // Redirect user to the homepage after successful login
  redirect('/');
}

export async function handleLogout() {
  await signOut();
}
