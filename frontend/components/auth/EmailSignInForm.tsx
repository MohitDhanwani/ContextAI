"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import Cookies from "js-cookie";

const signinSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

type SigninFormValues = z.infer<typeof signinSchema>;

export function EmailSignInForm() {
  const router = useRouter();
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SigninFormValues>({
    resolver: zodResolver(signinSchema),
  });

  const onSubmit = async (data: SigninFormValues) => {
    setApiError(null);
    try {
      const res = await api.auth.signin(data);
      Cookies.set("pdfchat_token", res.token, { expires: 1 });
      router.push("/app");
    } catch (err: any) {
      if (err.message.includes("429")) {
        setApiError("Too many attempts. Please wait a minute.");
      } else {
        setApiError(err.message || "Incorrect email or password.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-4 font-body">
      <div className="flex flex-col gap-1.5">
        <label className="text-[12px] text-muted tracking-widest font-mono uppercase">Email</label>
        <input
          type="email"
          {...register("email")}
          className={`w-full bg-surface border ${
            errors.email ? "border-error" : "border-border focus:border-accent-ink focus:ring-1 focus:ring-accent-ink"
          } h-[40px] rounded-[4px] px-3 text-primary text-[14px] outline-none transition-all duration-200`}
        />
        {errors.email && <span className="text-[12px] text-error">{errors.email.message}</span>}
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-[12px] text-muted tracking-widest font-mono uppercase">Password</label>
        <input
          type="password"
          {...register("password")}
          className={`w-full bg-surface border ${
            errors.password ? "border-error" : "border-border focus:border-accent-ink focus:ring-1 focus:ring-accent-ink"
          } h-[40px] rounded-[4px] px-3 text-primary text-[14px] outline-none transition-all duration-200`}
        />
        {errors.password && <span className="text-[12px] text-error">{errors.password.message}</span>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-accent-highlight hover:brightness-90 text-canvas font-medium h-[42px] rounded-[4px] flex items-center justify-center transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed mt-2"
      >
        {isSubmitting ? (
          <div className="w-4 h-4 border-2 border-canvas/30 border-t-canvas rounded-full animate-spin" />
        ) : (
          "Sign in"
        )}
      </button>

      {apiError && <div className="text-[13px] text-error text-center mt-1">{apiError}</div>}
    </form>
  );
}
