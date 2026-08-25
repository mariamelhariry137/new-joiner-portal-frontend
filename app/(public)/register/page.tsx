"use client";

import { useState, type FormEvent } from "react";
import { apiFetch, ApiError } from "@/lib/api/client";

type RegisterResponse = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
};

export default function RegisterPage() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    setError("");
    setSuccess("");

    const firstName = String(formData.get("firstName") ?? "").trim();
    const lastName = String(formData.get("lastName") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");
    const confirmPassword = String(
      formData.get("confirmPassword") ?? ""
    );

    // Frontend validation
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const requestBody = {
      firstName,
      lastName,
      email,
      password,
    };

    setLoading(true);

    try {
      await apiFetch<RegisterResponse>("/api/auth/register", {
        method: "POST",
        body: JSON.stringify(requestBody),
      });

      setSuccess("Your account has been created successfully.");

      form.reset();
      setShowPassword(false);
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

      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-40 -top-40 h-[450px] w-[450px] rounded-full bg-[#E60000]/20 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[450px] w-[450px] rounded-full bg-[#E60000]/10 blur-3xl" />

      {/* Main container */}
      <div className="relative grid w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-white shadow-2xl lg:grid-cols-2">

        {/* ===================================== */}
        {/* LEFT SIDE - VOIS BRANDING */}
        {/* ===================================== */}

        <section className="relative hidden min-h-[700px] overflow-hidden bg-[#111111] p-12 text-white lg:flex lg:flex-col lg:justify-between">

          {/* Decorative red circle */}
          <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full border-[50px] border-[#E60000]/20" />

          {/* Logo / Portal title */}
          <div className="relative z-10">
            <div className="flex items-center gap-4">

              {/* Temporary logo placeholder */}
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E60000] text-xl font-bold text-white shadow-lg">
                V
              </div>

              <div>
                <p className="text-xl font-bold tracking-wide">
                  VOIS
                </p>

                <p className="text-xs text-gray-400">
                  New Joiner Portal
                </p>
              </div>
            </div>
          </div>

          {/* Welcome message */}
          <div className="relative z-10">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-[#E60000]">
              Welcome aboard
            </p>

            <h2 className="max-w-md text-4xl font-bold leading-tight">
              Welcome to VOIS.
              <span className="mt-2 block text-[#E60000]">
                Your journey starts here.
              </span>
            </h2>

            <p className="mt-6 max-w-md text-base leading-7 text-gray-400">
              Your New Joiner Portal gives you everything you need
              to start your journey, learn about your organization,
              complete onboarding tasks, and stay connected with
              your team.
            </p>

            {/* Small feature cards */}
            <div className="mt-10 space-y-4">

              <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E60000]/15 text-[#E60000]">
                  ✓
                </div>

                <div>
                  <p className="text-sm font-semibold text-white">
                    Complete your onboarding
                  </p>

                  <p className="text-xs text-gray-400">
                    Follow your onboarding tasks step by step.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E60000]/15 text-[#E60000]">
                  ✓
                </div>

                <div>
                  <p className="text-sm font-semibold text-white">
                    Discover your company
                  </p>

                  <p className="text-xs text-gray-400">
                    Access useful information and resources.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E60000]/15 text-[#E60000]">
                  ✓
                </div>

                <div>
                  <p className="text-sm font-semibold text-white">
                    Connect with your team
                  </p>

                  <p className="text-xs text-gray-400">
                    Find the people who can help you get started.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom text */}
          <div className="relative z-10 border-l-2 border-[#E60000] pl-4">
            <p className="text-sm leading-6 text-gray-400">
              Everything you need for your first days at VOIS,
              all in one place.
            </p>
          </div>
        </section>

        {/* ===================================== */}
        {/* RIGHT SIDE - REGISTER FORM */}
        {/* ===================================== */}

        <section className="flex items-center bg-white p-6 sm:p-10 lg:p-12">
          <div className="mx-auto w-full max-w-md">

            {/* Mobile branding */}
            <div className="mb-8 flex items-center gap-3 lg:hidden">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E60000] font-bold text-white">
                V
              </div>

              <div>
                <p className="font-bold text-gray-950">
                  VOIS
                </p>

                <p className="text-xs text-gray-500">
                  New Joiner Portal
                </p>
              </div>
            </div>

            {/* Form heading */}
            <div className="mb-8">
              <p className="mb-2 text-sm font-bold uppercase tracking-[0.15em] text-[#E60000]">
                Welcome to VOIS
              </p>

              <h1 className="text-3xl font-bold tracking-tight text-[#25282B]">
                Create your account
              </h1>

              <p className="mt-3 text-sm leading-6 text-[#54575A]">
                Enter your information below to create your New
                Joiner Portal account.
              </p>
            </div>

            {/* FORM */}
            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              {/* First Name + Last Name */}
              <div className="grid gap-4 sm:grid-cols-2">

                <div>
                  <label
                    htmlFor="firstName"
                    className="mb-2 block text-sm font-semibold text-[#25282B]"
                  >
                    First name
                  </label>

                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder="John"
                    autoComplete="given-name"
                    required
                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-[#25282B] outline-none transition duration-200 placeholder:text-gray-400 hover:border-gray-400 focus:border-[#E60000] focus:ring-2 focus:ring-[#E60000]/15"
                  />
                </div>

                <div>
                  <label
                    htmlFor="lastName"
                    className="mb-2 block text-sm font-semibold text-[#25282B]"
                  >
                    Last name
                  </label>

                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder="Smith"
                    autoComplete="family-name"
                    required
                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-[#25282B] outline-none transition duration-200 placeholder:text-gray-400 hover:border-gray-400 focus:border-[#E60000] focus:ring-2 focus:ring-[#E60000]/15"
                  />
                </div>

              </div>

              {/* Email */}
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
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-[#25282B] outline-none transition duration-200 placeholder:text-gray-400 hover:border-gray-400 focus:border-[#E60000] focus:ring-2 focus:ring-[#E60000]/15"
                />
              </div>

              {/* Password */}
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
                    autoComplete="new-password"
                    minLength={8}
                    required
                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 pr-20 text-[#25282B] outline-none transition duration-200 placeholder:text-gray-400 hover:border-gray-400 focus:border-[#E60000] focus:ring-2 focus:ring-[#E60000]/15"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword((current) => !current)
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-[#E60000] transition hover:text-[#B80000]"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>

                <p className="mt-2 text-xs text-gray-500">
                  Password must contain at least 8 characters.
                </p>
              </div>

              {/* Confirm Password */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="mb-2 block text-sm font-semibold text-[#25282B]"
                >
                  Confirm password
                </label>

                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password again"
                  autoComplete="new-password"
                  minLength={8}
                  required
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-[#25282B] outline-none transition duration-200 placeholder:text-gray-400 hover:border-gray-400 focus:border-[#E60000] focus:ring-2 focus:ring-[#E60000]/15"
                />
              </div>

              {/* ERROR MESSAGE */}
              {error && (
                <div
                  role="alert"
                  className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3"
                >
                  <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#E60000] text-xs font-bold text-white">
                    !
                  </div>

                  <p className="text-sm text-red-700">
                    {error}
                  </p>
                </div>
              )}

              {/* SUCCESS MESSAGE */}
              {success && (
                <div
                  aria-live="polite"
                  className="flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-3"
                >
                  <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-600 text-xs font-bold text-white">
                    ✓
                  </div>

                  <p className="text-sm text-green-700">
                    {success}
                  </p>
                </div>
              )}

              {/* REGISTER BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-[#E60000] px-5 py-3.5 font-bold text-white shadow-sm transition duration-200 hover:bg-[#C80000] hover:shadow-md focus:outline-none focus:ring-4 focus:ring-[#E60000]/20 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading
                  ? "Creating your account..."
                  : "Create account"}
              </button>

              {/* Small note */}
              <p className="px-3 text-center text-xs leading-5 text-gray-500">
                By creating your account, you agree to follow your
                organization&apos;s New Joiner Portal policies.
              </p>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}