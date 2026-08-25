"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  useForm,
  type SubmitHandler,
} from "react-hook-form";

import {
  apiFetch,
  ApiError,
} from "@/lib/api/client";

import FormInput from "@/components/forms/FormInput";
import AuthLayout from "@/components/auth/AuthLayout";
import AuthMobileBrand from "@/components/auth/AuthMobileBrand";
import AuthFormHeader from "@/components/auth/AuthFormHeader";
import FormError from "@/components/auth/FormError";
import SubmitButton from "@/components/auth/SubmitButton";
import AuthSwitchLink from "@/components/auth/AuthSwitchLink";


/* ========================================= */
/* TYPES                                     */
/* ========================================= */

type RegisterResponse = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
};


type RegisterFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};


/* ========================================= */
/* COMPONENT                                 */
/* ========================================= */

export default function RegisterPage() {
  const router = useRouter();


  /* ======================================= */
  /* LOCAL STATE                             */
  /* ======================================= */

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


  /* ======================================= */
  /* REACT HOOK FORM                         */
  /* ======================================= */

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    mode: "onTouched",

    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });


  /* ======================================= */
  /* SUBMIT REGISTRATION                     */
  /* ======================================= */

  const onSubmit: SubmitHandler<
    RegisterFormValues
  > = async (data) => {
    setError("");
    setLoading(true);

    const requestBody = {
      firstName: data.firstName.trim(),
      lastName: data.lastName.trim(),
      email: data.email.trim(),
      password: data.password,
    };

    try {
      await apiFetch<RegisterResponse>(
        "/api/auth/register",
        {
          method: "POST",
          body: JSON.stringify(requestBody),
        }
      );

      router.push("/login?registered=true");
    } catch (err) {
      if (err instanceof ApiError) {
        if (err.status === 409) {
          setError(
            "An account with this email already exists. Please sign in instead."
          );
        } else if (err.status === 400) {
          setError(
            "Please check your information and make sure all fields are entered correctly."
          );
        } else if (err.status === 429) {
          setError(
            "Too many registration attempts. Please wait a moment and try again."
          );
        } else if (
          err.status === 500 ||
          err.status === 502 ||
          err.status === 503
        ) {
          setError(
            "We couldn't create your account right now. Please try again in a moment."
          );
        } else {
          setError(
            "Something went wrong while creating your account. Please try again."
          );
        }
      } else {
        setError(
          "Something went wrong while creating your account. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };


  /* ========================================= */
  /* UI                                        */
  /* ========================================= */

  return (
    <AuthLayout>
      {/* Mobile VOIS branding */}
      <AuthMobileBrand />


      {/* Form header */}
      <AuthFormHeader
        eyebrow="Welcome to VOIS"
        title="Create your account"
        description="Enter your information below to create your New Joiner Portal account."
      />


      {/* Registration form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
        noValidate
      >

        {/* =================================== */}
        {/* FIRST NAME + LAST NAME              */}
        {/* =================================== */}

        <div className="grid gap-4 sm:grid-cols-2">

          <FormInput<RegisterFormValues>
            label="First name"
            name="firstName"
            placeholder="John"
            autoComplete="given-name"
            register={register}
            error={errors.firstName}
            validation={{
              required:
                "First name is required.",

              minLength: {
                value: 2,
                message:
                  "First name must contain at least 2 characters.",
              },
            }}
          />


          <FormInput<RegisterFormValues>
            label="Last name"
            name="lastName"
            placeholder="Smith"
            autoComplete="family-name"
            register={register}
            error={errors.lastName}
            validation={{
              required:
                "Last name is required.",

              minLength: {
                value: 2,
                message:
                  "Last name must contain at least 2 characters.",
              },
            }}
          />

        </div>


        {/* =================================== */}
        {/* EMAIL                               */}
        {/* =================================== */}

        <FormInput<RegisterFormValues>
          label="Email address"
          name="email"
          type="email"
          placeholder="john.smith@company.com"
          autoComplete="email"
          register={register}
          error={errors.email}
          validation={{
            required:
              "Email address is required.",

            pattern: {
              value:
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/,

              message:
                "Please enter a valid email address.",
            },
          }}
        />


        {/* =================================== */}
        {/* PASSWORD                            */}
        {/* =================================== */}

        <FormInput<RegisterFormValues>
          label="Password"
          name="password"
          placeholder="Enter your password"
          autoComplete="new-password"
          register={register}
          error={errors.password}
          isPassword
          helperText="Password must contain at least 8 characters."
          validation={{
            required:
              "Password is required.",

            minLength: {
              value: 8,
              message:
                "Password must contain at least 8 characters.",
            },
          }}
        />


        {/* =================================== */}
        {/* CONFIRM PASSWORD                    */}
        {/* =================================== */}

        <FormInput<RegisterFormValues>
          label="Confirm password"
          name="confirmPassword"
          placeholder="Enter your password again"
          autoComplete="new-password"
          register={register}
          error={errors.confirmPassword}
          isPassword
          validation={{
            required:
              "Please confirm your password.",

            validate: (value) =>
              value === getValues("password") ||
              "Passwords do not match.",
          }}
        />


        {/* =================================== */}
        {/* BACKEND ERROR                       */}
        {/* =================================== */}

        <FormError message={error} />


        {/* =================================== */}
        {/* SUBMIT BUTTON                       */}
        {/* =================================== */}

        <SubmitButton
          loading={loading}
          text="Create account"
          loadingText="Creating your account..."
        />


        {/* =================================== */}
        {/* POLICIES NOTE                       */}
        {/* =================================== */}

        <p className="px-3 text-center text-xs leading-5 text-gray-500">
          By creating your account, you agree
          to follow your organization&apos;s
          New Joiner Portal policies.
        </p>


        {/* =================================== */}
        {/* LOGIN LINK                          */}
        {/* =================================== */}

        <AuthSwitchLink
          text="Already have an account?"
          linkText="Sign in"
          href="/login"
        />

      </form>
    </AuthLayout>
  );
}