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
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { handleResponse } from "../toast";

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
    // reValidateMode: "onChange",
    mode: "onChange",
  });
}

export function SignUpForm() {
  const navigate = useNavigate();
  // const [user, setUser] = React.useState({});

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    // reValidateMode: "onChange",
    // mode: "onChange",
  });

  const handleSignUp = async () => {
    const user = form.getValues();
    console.log(user);
    Register(user, navigate).then((res) => {
      if (res) {
        handleResponse("Success", "Account created successfully", "default");
      } else {
        handleResponse("Error", "Account creation failed", "destructive");
      }
    });
  };

  return (
    <Card className="w-full max-w-sm">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSignUp)}>
          <CardHeader>
            <CardTitle className="text-2xl">Register</CardTitle>
            <CardDescription>
              Fill in the form below to create an account.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="johndoe" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="email" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="password"
                        {...field}
                        type="password"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={handleSignUp} type="submit">
              Sign in
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
