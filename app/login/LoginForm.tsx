'use client';
import React from 'react';
import { signIn } from '@/lib/auth';
import { redirect } from 'next/navigation';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function LoginForm() {
  async function handleLogin(formData: FormData) {
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
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Sign in using your email and password.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <form action={handleLogin} className="w-full">
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                className="mt-1 form-input block w-full border-gray-300 rounded-md shadow-sm"
                type="email"
                id="email"
                name="email"
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                className="mt-1 form-input block w-full border-gray-300 rounded-md shadow-sm"
                type="password"
                id="password"
                name="password"
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Sign in
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
