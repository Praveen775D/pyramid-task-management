"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowUpRight, Check } from "lucide-react";
import { authApi } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function continueAsGuest() {
    setLoading(true);
    setError("");

    try {
      const response = await authApi.guest();
      localStorage.setItem("pyramid_token", response.accessToken);
      localStorage.setItem("pyramid_user", JSON.stringify(response.user));
      router.push("/dashboard");
    } catch {
      setError("Unable to continue right now. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function googlePlaceholder() {
    setError("Google authentication can be connected through OAuth when credentials are provided.");
  }

  return (
    <main className="min-h-screen bg-white text-[#171717] flex items-center justify-center px-5 py-10">
      <div className="w-full max-w-[430px]">
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="grid size-7 place-items-center rounded-[7px] bg-[#171717] text-white">
            <span className="text-[13px] font-bold">△</span>
          </div>
          <span className="text-[15px] font-semibold tracking-[-0.2px]">Pyramid</span>
        </div>

        <section className="rounded-[24px] border border-[#e5e5e5] bg-white px-5 py-5 shadow-[0_1px_2px_rgba(0,0,0,.06)] sm:px-6 sm:py-6">
          <div className="text-center">
            <h1 className="text-[18px] font-semibold leading-6 tracking-[-0.3px]">
              Let&apos;s get back on track
            </h1>
            <p className="mt-1 text-[14px] leading-5 text-[#8a8a8a]">
              Enter your email below to login to your account.
            </p>
          </div>

          <div className="mt-5 space-y-2.5">
            <button
              onClick={continueAsGuest}
              disabled={loading}
              className="h-9 w-full rounded-full bg-[#171717] px-4 text-[14px] font-medium text-white transition hover:bg-[#2b2b2b] disabled:cursor-wait disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Continue as Guest"}
            </button>

            <button
              onClick={googlePlaceholder}
              className="relative h-9 w-full rounded-full border border-[#e5e5e5] bg-white px-4 text-[14px] font-medium text-[#171717] transition hover:bg-[#fafafa]"
            >
              <span className="absolute left-1/2 top-1/2 -translate-x-[50px] -translate-y-1/2 font-bold text-[#4285F4]">
                G
              </span>
              Login with Google
            </button>
          </div>

          {error && (
            <p className="mt-3 rounded-lg bg-[#fff7ed] px-3 py-2 text-center text-xs text-[#c2410c]">
              {error}
            </p>
          )}
        </section>

        <p className="mx-auto mt-5 max-w-[270px] text-center text-[12px] leading-[15px] text-[#8a8a8a]">
          By clicking continue, you agree to our{" "}
          <a href="#" className="underline underline-offset-2">Terms of Service</a>{" "}
          and{" "}
          <a href="#" className="underline underline-offset-2">Privacy Policy</a>
        </p>
      </div>
    </main>
  );
}
