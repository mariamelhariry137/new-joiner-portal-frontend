"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getToken, clearAuth } from "@/lib/auth/token";
import Navbar from "@/components/NavBar";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const [checkingAuth, setCheckingAuth] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const token = getToken();

    // No token → user has not logged in
    if (!token) {
      clearAuth();
      router.replace("/login");
      return;
    }

    // Check JWT expiration
    try {
      const payloadPart = token.split(".")[1];

      if (!payloadPart) {
        clearAuth();
        router.replace("/login");
        return;
      }

      const payload = JSON.parse(
        atob(
          payloadPart
            .replace(/-/g, "+")
            .replace(/_/g, "/")
        )
      );

      const currentTime = Math.floor(Date.now() / 1000);

      if (payload.exp && payload.exp <= currentTime) {
        clearAuth();
        router.replace("/login");
        return;
      }

      setAuthenticated(true);
    } catch {
      clearAuth();
      router.replace("/login");
      return;
    } finally {
      setCheckingAuth(false);
    }
  }, [router]);

  if (checkingAuth) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-sm text-muted-foreground">
          Checking your session...
        </p>
      </main>
    );
  }

  if (!authenticated) {
    return null;
  }

 return (
  <>
    <Navbar />
    {children}
  </>
);
}