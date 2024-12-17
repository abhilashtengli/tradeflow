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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Buyer");
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState("");

  const router = useRouter();

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    setEmailError("");
    setIsLoading(true);

    const userData = {
      name,
      email,
      password,
      role
    };

    try {
      await axios.post("/api/auth/signup", userData);
      console.log("signup successful");

      const res = await signIn("credentials", {
        redirect: false,
        email,
        password
      });
      console.log("signin.....");

      if (res?.ok) {
        let route = "";
        switch (role) {
          case "Buyer":
            route = "/buyer/profile";
            break;
          case "Seller":
            route = "/seller/profile";
            break;
          case "Transporter":
            route = "/transporter/profile";
            break;
          case "FreightForwarder":
            route = "/freightForwarder/profile";
            break;
        }
        // Prefetch the route
        router.prefetch(route);

        // Navigate to the route
        await router.push(route);
      } else {
        console.log("Error signing in after signup:", res?.error);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Sign Up
          </CardTitle>
          <CardDescription className="text-center text-gray-600">
            Create your account to get started
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <Input
                id="name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {emailError && (
                <p className="text-sm text-red-600">{emailError}</p>
              )}
            </div>
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="role"
                className="text-sm font-medium text-gray-700"
              >
                Role
              </label>
              <Select value={role} onValueChange={setRole}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Buyer">Buyer</SelectItem>
                  <SelectItem value="Seller">Seller</SelectItem>
                  <SelectItem value="Transporter">Transporter</SelectItem>
                  <SelectItem value="FreightForwarder">
                    Freight Forwarder
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              type="submit"
              className="w-full bg-black text-white hover:bg-gray-800"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing up...
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center space-y-4">
          <Link
            href="/signin"
            className="text-sm text-blue-600 hover:underline"
          >
            Already have an account? Sign In
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Signup;
