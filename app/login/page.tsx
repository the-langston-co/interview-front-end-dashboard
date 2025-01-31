import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { signIn } from '@/lib/auth';
import { LoginForm } from '@/app/login/LoginForm';

export default function LoginPage() {
  async function handleLogin(formData: FormData) {
    "use server";
    const email = formData.get("email")?.toString() || "";
    const password = formData.get("password")?.toString() || "";

    // Use next-auth credentials sign-in
    const result = await signIn("credentials", {
      redirect: false, // Do not redirect automatically
      email,
      password,
    });

    if (result?.error) {
      throw new Error(result.error); // Improper credentials
    }

    // Redirect user to the homepage after successful login
    redirect("/");
  }

  return (
    <div className="min-h-screen flex justify-center items-start md:items-center p-8">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>Sign in using your email and password.</CardDescription>
        </CardHeader>
        <CardFooter>
          <LoginForm/>
        </CardFooter>
      </Card>
    </div>
  );
}