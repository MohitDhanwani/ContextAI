"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { EmailSignInForm } from "@/components/auth/EmailSignInForm";
import { getAuthToken } from "@/lib/api";

export default function SignInPage() {
  const router = useRouter();

  useEffect(() => {
    if (getAuthToken()) {
      router.push("/app");
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-base flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-[400px] bg-surface border border-border rounded-[12px] p-10 flex flex-col items-center">
        <div className="font-display text-[20px] text-primary mb-8">PDFChat</div>
        
        <h1 className="font-body font-normal text-[22px] text-primary mb-8">
          Welcome back
        </h1>



        <EmailSignInForm />

        <div className="mt-8">
          <Link href="/auth/signup" className="text-[14px] text-secondary hover:text-primary transition-colors">
            Don&apos;t have an account? Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
