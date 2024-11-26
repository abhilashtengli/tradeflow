/* eslint-disable @typescript-eslint/no-unused-vars */
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
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Buyer");

  const router = useRouter();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const userData = {
      name,
      email,
      password,
      role
    };
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      await axios.post("/api/auth/signup", userData);

      console.log("signup successful");

      const res = await signIn("credentials", {
        redirect: false,
        email,
        password
      });
      console.log("signin.....");

      if (res?.ok) {
        console.log("okkk.");
        if (role === "Buyer") {
          router.push("/buyer/dashboard");
        } else if (role === "Seller") {
          router.push("/seller/dashboard");
        } else if (role === "Transporter") {
          router.push("/transporter/tsdashboard");
        } else if (role === "FreightForwarder") {
          router.push("/ffdashboard");
        }
      } else {
        console.log("Error signing in after signup:", res?.error);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center h-dvh">
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Sign Up</CardTitle>
            <CardDescription />
          </CardHeader>
          <CardContent>
            <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
              <Input
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="flex flex-col">
                <select
                  id="role"
                  name="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="border p-2 rounded-md cursor-pointer"
                >
                  <option value="Buyer">Buyer</option>
                  <option value="Seller">Seller</option>
                  <option value="Transporter">Transporter</option>
                  <option value="FreightForwarder">Freight Forwader</option>
                </select>
              </div>
              <Button
                //   onClick={handleSubmit}
                type="submit"
                variant="outline"
                className="bg-black text-gray-300"
              >
                Sign Up
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
            <Link href="/signin">Already have a account? Sign In</Link>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default Signup;
