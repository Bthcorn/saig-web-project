import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import React from "react"

export function LoginForm() {
  const [user, setUser] = React.useState({});

  const test = () => {
    console.log(user);
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" onChange={(e) => setUser({...user, user: e.target.value})} required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" onChange={(e) => setUser({...user, pass: e.target.value})}  required />
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={test}>Sign in</Button>
      </CardFooter>
    </Card>
  )
}
