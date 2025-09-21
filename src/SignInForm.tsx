"use client";
import { useAuthActions } from "@convex-dev/auth/react";

export function SignInForm() {
  const { signIn } = useAuthActions();

  return (
    <div className="flex justify-center items-center min-h-[200px]">
      <button
        className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
        onClick={() => void signIn("anonymous")}
      >
        تسجيل الدخول
      </button>
    </div>
  );
}