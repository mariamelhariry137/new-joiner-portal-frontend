"use client";

import {
  useEffect,
  useState,
  type FormEvent,
} from "react";
import {
  useRouter,
  useSearchParams,
} from "next/navigation";
import { apiFetch, ApiError } from "@/lib/api/client";
import {
  getToken,
  setToken,
  setStoredUser,
  clearAuth,
} from "@/lib/auth/token";
type LoginResponse = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  accessToken: string;
  tokenType: string;
  expiresIn: number;
};

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

const registered =
  searchParams.get("registered") === "true";
useEffect(() => {
  const token = getToken();

  if (!token) {
    return;
  }

  try {
    const payloadPart = token.split(".")[1];

    if (!payloadPart) {
      clearAuth();
      return;
    }

    const normalizedPayload = payloadPart
      .replace(/-/g, "+")
      .replace(/_/g, "/");

    const paddedPayload =
      normalizedPayload +
      "=".repeat(
        (4 - (normalizedPayload.length % 4)) % 4
      );

    const payload = JSON.parse(
      atob(paddedPayload)
    );

    const currentTime =
      Math.floor(Date.now() / 1000);

    if (
      payload.exp &&
      payload.exp <= currentTime
    ) {
      clearAuth();
      return;
    }

    // User is already logged in.
    router.replace("/dashboard");
  } catch {
    clearAuth();
  }
}, [router]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");

    setError("");
    setLoading(true);

    try {
      const response = await apiFetch<LoginResponse>(
        "/api/auth/login",
        {
          method: "POST",
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      // Temporary frontend token storage.
      // We can improve the auth-storage approach afterward.
      setToken(response.accessToken);

setStoredUser({
  id: response.id,
  email: response.email,
  firstName: response.firstName,
  lastName: response.lastName,
});

      router.replace("/profile");
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0d0d0d] px-4 py-10">

      <div className="absolute -left-40 -top-40 h-[450px] w-[450px] rounded-full bg-[#E60000]/20 blur-3xl" />

      <div className="absolute -bottom-40 -right-40 h-[450px] w-[450px] rounded-full bg-[#E60000]/10 blur-3xl" />

      <div className="relative grid w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-white shadow-2xl lg:grid-cols-2">

        {/* Left branding section */}
        <section className="hidden min-h-[650px] bg-[#111111] p-12 text-white lg:flex lg:flex-col lg:justify-between">

          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E60000] text-xl font-bold">
              V
            </div>

            <div>
              <p className="text-xl font-bold">VOIS</p>
              <p className="text-xs text-gray-400">
                New Joiner Portal
              </p>
            </div>
          </div>

          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-[#E60000]">
              Welcome back
            </p>

            <h2 className="text-4xl font-bold leading-tight">
              Continue your
              <span className="block text-[#E60000]">
                onboarding journey.
              </span>
            </h2>

            <p className="mt-6 max-w-md leading-7 text-gray-400">
              Sign in to access your dashboard, onboarding tasks,
              company resources, and team information.
            </p>
          </div>

          <p className="border-l-2 border-[#E60000] pl-4 text-sm text-gray-400">
            Everything you need for your journey at VOIS.
          </p>
        </section>

        {/* Login form */}
        <section className="flex items-center bg-white p-6 sm:p-10 lg:p-12">
          <div className="mx-auto w-full max-w-md">

            <div className="mb-8">
              <p className="mb-2 text-sm font-bold uppercase tracking-[0.15em] text-[#E60000]">
                Welcome back
              </p>

              <h1 className="text-3xl font-bold text-[#25282B]">
                Sign in to your account
              </h1>

              <p className="mt-3 text-sm text-[#54575A]">
                Enter your email and password to continue.
              </p>
            </div>
            {registered && (
  <div className="mb-5 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
    Your account has been created successfully.
    Please sign in to continue.
  </div>
)}

            <form onSubmit={handleSubmit} className="space-y-5">

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-[#25282B]"
                >
                  Email address
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john.smith@company.com"
                  autoComplete="email"
                  required
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 text-[#25282B] outline-none transition focus:border-[#E60000] focus:ring-2 focus:ring-[#E60000]/15"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-semibold text-[#25282B]"
                >
                  Password
                </label>

                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    required
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 pr-20 text-[#25282B] outline-none transition focus:border-[#E60000] focus:ring-2 focus:ring-[#E60000]/15"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword((current) => !current)
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-[#E60000]"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              {error && (
                <div
                  role="alert"
                  className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                >
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-[#E60000] px-5 py-3.5 font-bold text-white transition hover:bg-[#C80000] focus:ring-4 focus:ring-[#E60000]/20 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}