import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Login } from "./action";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters",
  }),
});

export function ProfileForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
}

export function LoginForm() {
  const navigate = useNavigate();
  const [user, setUser] = React.useState({});

  const handleLogin = async () => {
    Login(user, navigate);
  };

  // setTimeout(() => {
  //   handleLogin();
  // }, 3000);

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Board Game Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Username</Label>
          <Input
            // id="email"
            // type="email"
            // placeholder="m@example.com"
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            required
          />
        </div>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="underline">
            Sign up
          </Link>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={handleLogin} type="submit">
          Sign in
        </Button>
      </CardFooter>
    </Card>
  );
}
