"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { Eye, EyeOff } from "lucide-react";
import Cookies from "js-cookie";

const signupSchema = z.object({
  username: z.string().min(2, "Username must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type SignupFormValues = z.infer<typeof signupSchema>;

export function EmailSignUpForm() {
  const router = useRouter();
  const [apiError, setApiError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormValues) => {
    setApiError(null);
    try {
      const res = await api.auth.signup({
        username: data.username,
        email: data.email,
        password: data.password,
      });
      Cookies.set("pdfchat_token", res.token, { expires: 1 });
      router.push("/app");
    } catch (err: any) {
      if (err.message.includes("429")) {
        setApiError("Too many attempts. Please wait a minute.");
      } else {
        setApiError(err.message || "Failed to create account.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label className="text-[12px] text-secondary tracking-[0.04em] uppercase">Username</label>
        <input
          type="text"
          {...register("username")}
          className={`w-full bg-[#0a0a0a] border ${
            errors.username ? "border-error" : "border-border focus:border-[#555555]"
          } h-[40px] rounded-md px-3 text-primary text-[14px] outline-none transition-colors duration-150`}
        />
        {errors.username && <span className="text-[12px] text-error">{errors.username.message}</span>}
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-[12px] text-secondary tracking-[0.04em] uppercase">Email</label>
        <input
          type="email"
          {...register("email")}
          className={`w-full bg-[#0a0a0a] border ${
            errors.email ? "border-error" : "border-border focus:border-[#555555]"
          } h-[40px] rounded-md px-3 text-primary text-[14px] outline-none transition-colors duration-150`}
        />
        {errors.email && <span className="text-[12px] text-error">{errors.email.message}</span>}
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-[12px] text-secondary tracking-[0.04em] uppercase">Password</label>
        <div className="relative w-full">
          <input
            type={showPassword ? "text" : "password"}
            {...register("password")}
            className={`w-full bg-[#0a0a0a] border ${
              errors.password ? "border-error" : "border-border focus:border-[#555555]"
            } h-[40px] rounded-md px-3 pr-10 text-primary text-[14px] outline-none transition-colors duration-150`}
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-secondary"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
        {errors.password && <span className="text-[12px] text-error">{errors.password.message}</span>}
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-[12px] text-secondary tracking-[0.04em] uppercase">Confirm Password</label>
        <div className="relative w-full">
          <input
            type={showPassword ? "text" : "password"}
            {...register("confirmPassword")}
            className={`w-full bg-[#0a0a0a] border ${
              errors.confirmPassword ? "border-error" : "border-border focus:border-[#555555]"
            } h-[40px] rounded-md px-3 pr-10 text-primary text-[14px] outline-none transition-colors duration-150`}
          />
        </div>
        {errors.confirmPassword && <span className="text-[12px] text-error">{errors.confirmPassword.message}</span>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-accent hover:bg-accent-hover text-[#0a0a0a] font-medium h-[42px] rounded-md flex items-center justify-center transition-colors duration-150 disabled:opacity-70 disabled:cursor-not-allowed mt-2"
      >
        {isSubmitting ? (
          <div className="w-4 h-4 border-2 border-[#0a0a0a]/30 border-t-[#0a0a0a] rounded-full animate-spin" />
        ) : (
          "Create account"
        )}
      </button>

      {apiError && <div className="text-[13px] text-error text-center mt-1">{apiError}</div>}
    </form>
  );
}
