import { redirect } from 'next/navigation';

import { signIn } from '@/lib/auth';
import { LoginForm } from '@/app/login/LoginForm';

export default function LoginPage() {
  async function handleLogin(formData: FormData) {
    'use server';
    const email = formData.get('email')?.toString() || '';
    const password = formData.get('password')?.toString() || '';

    // Use next-auth credentials sign-in
    const result = await signIn('credentials', {
      redirect: false, // Do not redirect automatically
      email,
      password
    });

    if (result?.error) {
      throw new Error(result.error); // Improper credentials
    }

    // Redirect user to the homepage after successful login
    redirect('/');
  }

  return (
    <div className="min-h-screen flex justify-center items-start md:items-center p-8">
      <LoginForm />
    </div>
  );
}
