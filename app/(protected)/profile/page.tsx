"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { apiAuthFetch, ApiError } from "@/lib/api/client";
import { getToken } from "@/lib/auth/token";

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

  useEffect(() => {
    async function loadProfile() {
      const token = getToken();

      if (!token) {
        router.push("/login" );
        return;
      }

      try {
        const data = await apiAuthFetch<Profile>("/me");

        setProfile(data);
        setFirstName(data.firstName);
        setLastName(data.lastName);
      } catch (err) {
        if (err instanceof ApiError) {
          setError(err.message);
        } else {
          setError("Unable to load profile.");
        }
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, [router]);

  function handleCancel() {
    if (!profile) return;

    setFirstName(profile.firstName);
    setLastName(profile.lastName);
    setEditing(false);
  }

  function handleSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!profile) return;

    // Temporary UI update.
    // We still need a backend update-profile endpoint
    // before changes can be stored permanently.
    setProfile({
      ...profile,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
    });

    setEditing(false);
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0d0d0d]">
        <p className="text-white">Loading profile...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0d0d0d] px-4">
        <div className="rounded-xl border border-red-900 bg-red-950/20 p-6 text-red-400">
          {error}
        </div>
      </main>
    );
  }

  if (!profile) {
    return null;
  }

  const initials =
    `${profile.firstName.charAt(0)}${profile.lastName.charAt(0)}`.toUpperCase();

  return (
    <main className="min-h-screen bg-[#0d0d0d] px-4 py-12 text-white">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-[#E60000]">
            My Account
          </p>

          <h1 className="text-4xl font-bold">Profile</h1>

          <p className="mt-2 text-gray-400">
            View and manage your personal information.
          </p>
        </div>

        <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#151515] shadow-2xl">
          <div className="h-2 bg-[#E60000]" />

          <div className="p-6 sm:p-10">
            <div className="flex flex-col gap-6 border-b border-white/10 pb-8 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-5">
                {/* Photo placeholder */}
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#E60000] text-3xl font-bold">
                  {initials}
                </div>

                <div>
                  <h2 className="text-2xl font-bold">
                    {profile.firstName} {profile.lastName}
                  </h2>

                  <p className="mt-1 text-gray-400">
                    {profile.email}
                  </p>
                </div>
              </div>

              {!editing && (
                <button
                  type="button"
                  onClick={() => setEditing(true)}
                  className="rounded-xl bg-[#E60000] px-5 py-3 font-semibold transition hover:bg-[#c80000]"
                >
                  Edit profile
                </button>
              )}
            </div>

            <form onSubmit={handleSave} className="mt-8">
              <div className="grid gap-6 sm:grid-cols-2">
                {/* First name */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-300">
                    First name
                  </label>

                  {editing ? (
                    <input
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                      className="w-full rounded-xl border border-white/20 bg-[#202020] px-4 py-3 outline-none focus:border-[#E60000]"
                    />
                  ) : (
                    <div className="rounded-xl border border-white/10 bg-[#202020] px-4 py-3">
                      {profile.firstName}
                    </div>
                  )}
                </div>

                {/* Last name */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-300">
                    Last name
                  </label>

                  {editing ? (
                    <input
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                      className="w-full rounded-xl border border-white/20 bg-[#202020] px-4 py-3 outline-none focus:border-[#E60000]"
                    />
                  ) : (
                    <div className="rounded-xl border border-white/10 bg-[#202020] px-4 py-3">
                      {profile.lastName}
                    </div>
                  )}
                </div>

                {/* Email */}
                <div className="sm:col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-gray-300">
                    Email
                  </label>

                  <div className="rounded-xl border border-white/10 bg-[#202020] px-4 py-3 text-gray-400">
                    {profile.email}
                  </div>

                  {editing && (
                    <p className="mt-2 text-xs text-gray-500">
                      Email cannot be edited.
                    </p>
                  )}
                </div>
              </div>

              {editing && (
                <div className="mt-8 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="rounded-xl border border-white/20 px-6 py-3 font-semibold hover:bg-white/10"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="rounded-xl bg-[#E60000] px-6 py-3 font-semibold hover:bg-[#c80000]"
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