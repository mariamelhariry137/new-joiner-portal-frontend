import type { ReactNode } from "react";
import AuthBrandPanel from "./AuthBrandPanel";

type AuthLayoutProps = {
  children: ReactNode;
};

export default function AuthLayout({
  children,
}: AuthLayoutProps) {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0d0d0d] px-4 py-10">
      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-40 -top-40 h-[450px] w-[450px] rounded-full bg-[#E60000]/20 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[450px] w-[450px] rounded-full bg-[#E60000]/10 blur-3xl" />

      {/* Main container */}
      <div className="relative grid w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-white shadow-2xl lg:grid-cols-2">
        <AuthBrandPanel />

        {/* Right side */}
        <section className="flex items-center bg-white p-6 sm:p-10 lg:p-12">
          <div className="mx-auto w-full max-w-md">
            {children}
          </div>
        </section>
      </div>
    </main>
  );
}