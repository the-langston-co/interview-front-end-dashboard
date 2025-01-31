'use client';
import React, { useActionState } from 'react';

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { handleLogin, LoginState } from '@/app/login/loginActions';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const initialState: LoginState = { message: null };

export function LoginForm() {
  const [state, formAction, pending] = useActionState(
    handleLogin,
    initialState
  );

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
          <form action={formAction} className="w-full">
            <div className="mb-4">
              <Label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </Label>
              <Input
                className="mt-1 form-input block w-full border-gray-300 rounded-md shadow-sm"
                type="email"
                id="email"
                name="email"
                required
              />
            </div>
            <div className="mb-6">
              <Label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </Label>
              <Input
                className="mt-1 form-input block w-full border-gray-300 rounded-md shadow-sm"
                type="password"
                id="password"
                name="password"
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={pending}>
              {pending ? 'Loading...' : 'Sign in'}
            </Button>
            {state.message && (
              <p className="mt-2 text-sm text-red-600">{state.message}</p>
            )}
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
