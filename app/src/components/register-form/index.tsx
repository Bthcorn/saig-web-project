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
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Register } from "./actions";
import { toast } from "../ui/use-toast";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters",
  }),
  email: z.string().email(),
  name: z.string().min(2, {
    message: "Name must be at least 2 characters",
  }),
});

export function ProfileForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
}

export function SignUpForm() {
  const navigate = useNavigate();
  const [user, setUser] = React.useState({});

  const handleSignUp = async () => {
    Register(user, navigate).then((res) => {
      if (res) {
        navigate("/");
        toast({
          title: "Success",
          description: "Account created successfully",
        });
      }
    });
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Register</CardTitle>
        <CardDescription>
          Fill in the form below to create an account.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            type="text"
            placeholder="John Doe"
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            required
          />
        </div>
        {/* username */}
        <div className="grid gap-2">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            type="text"
            placeholder="johndoe"
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
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
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={handleSignUp} type="submit">
          Sign in
        </Button>
      </CardFooter>
    </Card>
  );
}
