"use client";
import { useAuthActions } from "@convex-dev/auth/react";
import { useConvexAuth, useMutation } from "convex/react";
import { api } from "../convex/_generated/api";

export function SignOutButton() {
  const { isAuthenticated } = useConvexAuth();
  const { signOut } = useAuthActions();
  const logoutStudent = useMutation(api.students.logoutStudent);

  if (!isAuthenticated) {
    return null;
  }

  const handleSignOut = async () => {
    await logoutStudent();
    await signOut();
  };

  return (
    <button
      className="px-4 py-2 rounded bg-white text-red-600 border border-red-200 font-semibold hover:bg-red-50 hover:text-red-700 transition-colors shadow-sm hover:shadow"
      onClick={handleSignOut}
    >
      تسجيل خروج
    </button>
  );
}
