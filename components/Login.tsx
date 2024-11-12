"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";
import axios from "axios";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password
    });
      const { data } = await axios.post("/api/getUserRole", { email });
      const userRole = data.role;

    if (res?.error) {
      setError(res.error);
    } else {
      if (userRole === "Buyer" || userRole === "Seller") {
        redirect("/dashboard");
      } else if (userRole === "Transporter") {
        redirect("/tsdashboard");
      }
    }
  };
  return (
    <div className="">
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Sign In</CardTitle>
          <CardDescription />
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
            <Input
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              variant="outline"
              type="submit"
              className="bg-black text-gray-300"
            >
              Sign In
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-3">
          <span>Or</span>
          <form>
            <Button variant="outline" type="submit">
              Sign In with Google
            </Button>
          </form>
          <Link href="/signup">Dont have a account? Sign Up</Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
