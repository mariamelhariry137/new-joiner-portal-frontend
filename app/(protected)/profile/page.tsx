"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { apiFetch, ApiError } from "@/lib/api/client";

type Profile = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
};

export default function ProfilePage() {
  const router = useRouter();

  const [profile, setProfile] = useState<Profile | null>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadProfile() {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        router.push("/login");
        return;
      }

      try {
        const data = await apiFetch<Profile>("/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProfile(data);
        setFirstName(data.firstName);
        setLastName(data.lastName);
      } catch (err) {
        if (err instanceof ApiError) {
          setError(err.message);

          if (err.status === 401) {
            localStorage.removeItem("accessToken");
            router.push("/login");
          }
        } else {
          setError("Unable to load your profile.");
        }
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, [router]);

  function handleCancel() {
    if (!profile) {
      return;
    }

    setFirstName(profile.firstName);
    setLastName(profile.lastName);
    setEditing(false);
    setMessage("");
    setError("");
  }

  function handleSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!profile) {
      return;
    }

    /*
      Temporary frontend-only update.

      When a backend PATCH/PUT profile endpoint exists,
      this function should call that API instead.
    */

    setProfile({
      ...profile,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
    });

    setEditing(false);
    setMessage("Profile updated on this page.");
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0d0d0d]">
        <p className="text-white">Loading profile...</p>
      </main>
    );
  }

  if (error && !profile) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0d0d0d] px-4">
        <div className="rounded-2xl border border-red-900 bg-[#151515] p-8 text-center">
          <p className="text-red-500">{error}</p>
        </div>
      </main>
    );
  }

  if (!profile) {
    return null;
  }

  const initials =
    `${profile.firstName.charAt(0)}${profile.lastName.charAt(0)}`
      .toUpperCase();

  return (
    <main className="min-h-screen bg-[#0d0d0d] px-4 py-12 text-white">
      <div className="mx-auto max-w-4xl">

        {/* Heading */}
        <div className="mb-8">
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-[#E60000]">
            My account
          </p>

          <h1 className="text-4xl font-bold">
            Profile
          </h1>

          <p className="mt-2 text-gray-400">
            View and manage your personal information.
          </p>
        </div>

        {/* Profile Card */}
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#151515] shadow-2xl">

          {/* Red top accent */}
          <div className="h-2 bg-[#E60000]" />

          <div className="p-6 sm:p-10">

            {/* Profile header */}
            <div className="flex flex-col gap-6 border-b border-white/10 pb-8 sm:flex-row sm:items-center sm:justify-between">

              <div className="flex items-center gap-5">

                {/* Photo placeholder */}
                <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full border-4 border-[#E60000]/30 bg-[#E60000] text-3xl font-bold text-white shadow-lg">
                  {initials}
                </div>

                <div>
                  <h2 className="text-2xl font-bold">
                    {profile.firstName} {profile.lastName}
                  </h2>

                  <p className="mt-1 text-gray-400">
                    {profile.email}
                  </p>

                  <span className="mt-3 inline-block rounded-full bg-[#E60000]/10 px-3 py-1 text-xs font-semibold text-[#ff4d4d]">
                    New Joiner
                  </span>
                </div>
              </div>

              {!editing && (
                <button
                  type="button"
                  onClick={() => {
                    setEditing(true);
                    setMessage("");
                  }}
                  className="rounded-xl bg-[#E60000] px-5 py-3 font-semibold text-white transition hover:bg-[#C80000]"
                >
                  Edit profile
                </button>
              )}
            </div>

            {/* Profile details */}
            <form
              onSubmit={handleSave}
              className="mt-8"
            >
              <div className="grid gap-6 sm:grid-cols-2">

                {/* First name */}
                <div>
                  <label
                    htmlFor="firstName"
                    className="mb-2 block text-sm font-semibold text-gray-300"
                  >
                    First name
                  </label>

                  {editing ? (
                    <input
                      id="firstName"
                      value={firstName}
                      onChange={(event) =>
                        setFirstName(event.target.value)
                      }
                      required
                      className="w-full rounded-xl border border-white/20 bg-[#202020] px-4 py-3 text-white outline-none transition focus:border-[#E60000] focus:ring-2 focus:ring-[#E60000]/20"
                    />
                  ) : (
                    <div className="rounded-xl border border-white/10 bg-[#202020] px-4 py-3 text-gray-200">
                      {profile.firstName}
                    </div>
                  )}
                </div>

                {/* Last name */}
                <div>
                  <label
                    htmlFor="lastName"
                    className="mb-2 block text-sm font-semibold text-gray-300"
                  >
                    Last name
                  </label>

                  {editing ? (
                    <input
                      id="lastName"
                      value={lastName}
                      onChange={(event) =>
                        setLastName(event.target.value)
                      }
                      required
                      className="w-full rounded-xl border border-white/20 bg-[#202020] px-4 py-3 text-white outline-none transition focus:border-[#E60000] focus:ring-2 focus:ring-[#E60000]/20"
                    />
                  ) : (
                    <div className="rounded-xl border border-white/10 bg-[#202020] px-4 py-3 text-gray-200">
                      {profile.lastName}
                    </div>
                  )}
                </div>

                {/* Email */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold text-gray-300"
                  >
                    Email address
                  </label>

                  <div
                    id="email"
                    className="rounded-xl border border-white/10 bg-[#202020] px-4 py-3 text-gray-400"
                  >
                    {profile.email}
                  </div>

                  {editing && (
                    <p className="mt-2 text-xs text-gray-500">
                      Email address cannot be changed from this page.
                    </p>
                  )}
                </div>
              </div>

              {/* Success message */}
              {message && (
                <div className="mt-6 rounded-xl border border-green-900 bg-green-950/30 px-4 py-3 text-sm text-green-400">
                  {message}
                </div>
              )}

              {/* Error message */}
              {error && (
                <div className="mt-6 rounded-xl border border-red-900 bg-red-950/30 px-4 py-3 text-sm text-red-400">
                  {error}
                </div>
              )}

              {/* Editing buttons */}
              {editing && (
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-end">

                  <button
                    type="button"
                    onClick={handleCancel}
                    className="rounded-xl border border-white/20 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="rounded-xl bg-[#E60000] px-6 py-3 font-semibold text-white transition hover:bg-[#C80000]"
                  >
                    Save changes
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}