"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function UserAuthForm({ className, ...props }) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [data, setData] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [otp, setOTP] = React.useState(null);
  const supabase = createClient();
  const router = useRouter();

  async function onSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithOtp({
        email: email,
      });

      if (!error && !data.user && !data.session) {
        setData(true);
      }

      if (error) {

        if (error?.status === 429) {
          toast.error('Too many requests. Try again after 10 minutes')
        }
        console.error("Error:", error);
      }
    } catch (error) {
      console.error({ error });
    } finally {
      setIsLoading(false);
    }
  }

  async function verifyOtp() {
    setIsLoading(true);
    try {
      const {
        data: { session },
        error,
      } = await supabase.auth.verifyOtp({
        email,
        token: otp,
        type: "email",
      });

      if (session) {
        router.push("/");
      }

      if (error) {
        toast.error("Token has expired or is invalid");
        console.error("Error:", error);
      }
    } catch (error) {
      console.log({ error });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSocialLogin() {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/confirm` ,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      })

      if (data) {
        console.log({data})
      }

      if (error) {
        console.log("Error:", error)
      }
      
    } catch (error) {
      
      console.log({ error });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <div className="grid gap-2">
        <div className="grid gap-1">
          <Label className="sr-only" htmlFor="email">
            Email
          </Label>
          <Input
            id="email"
            placeholder="name@example.com"
            type="email"
            autoCapitalize="none"
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            autoCorrect="off"
            disabled={isLoading}
          />
        </div>
        {data && (
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email-otp">
              OTP
            </Label>

            <Input
              id="email-otp"
              placeholder="000000"
              onChange={(e) => setOTP(e.target.value)}
              type="text"
              autoCapitalize="none"
              autoComplete="off"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
        )}

        {data ? (
          <Button onClick={verifyOtp} disabled={!otp || isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            {!otp ? "Please check your email" : "Continue"}
          </Button>
        ) : (
          <Button onClick={onSubmit} disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Continue with Email
          </Button>
        )}
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button onClick={handleSocialLogin} variant="outline" type="button" disabled={isLoading}>
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.google className="mr-2 h-4 w-4" />
        )}{" "}
        Google
      </Button>
    </div>
  );
}
