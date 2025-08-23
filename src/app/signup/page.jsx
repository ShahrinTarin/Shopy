"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";

const SignupPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const logoColor = "#1b9c85";

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Signup failed");
      } else {
        toast.success("Signup successful! Please login.");
        router.push("/login");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 p-6">
      <Toaster position="top-right" />

      <div className="relative max-w-lg w-full bg-white rounded-3xl shadow-2xl p-8 overflow-hidden">
        {/* Background Gradients */}
        <div
          className="absolute -top-20 -left-20 w-40 h-40 bg-gradient-to-tr from-[#1b9c85]/50 to-[#1b9c85]/20 rounded-full blur-3xl"
          style={{ animation: "spinGlow 30s linear infinite" }}
        ></div>
        <div
          className="absolute -bottom-20 -right-20 w-40 h-40 bg-gradient-to-bl from-[#1b9c85]/40 to-[#1b9c85]/10 rounded-full blur-3xl"
          style={{ animation: "spinReverseGlow 40s linear infinite" }}
        ></div>

        {/* Animated Logo */}
        <div className="flex justify-center mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="120"
            height="40"
            viewBox="0 0 200 50"
            className="cursor-pointer"
            style={{ animation: "floatGlow 4s ease-in-out infinite", transformOrigin: "50% 50%" }}
          >
            <g fill="none" stroke={logoColor} strokeWidth="3">
              <circle cx="15" cy="40" r="5" />
              <circle cx="45" cy="40" r="5" />
              <path d="M5 5 L20 5 L35 35 L50 35" strokeLinecap="round" strokeLinejoin="round" />
            </g>
            <text
              x="60"
              y="35"
              fontFamily="Arial, sans-serif"
              fontSize="28"
              fill={logoColor}
              fontWeight="bold"
            >
              Shopy
            </text>
          </svg>
        </div>

        <h2 className="text-3xl font-bold text-[#1b9c85] mb-6 text-center">
          Create Account
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Sign up to get started with Shopy
        </p>

        <form onSubmit={handleSignup} className="flex flex-col gap-5 relative z-10">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            required
            className="p-3 border border-[#1b9c85]/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1b9c85] transition placeholder-gray-400"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="p-3 border border-[#1b9c85]/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1b9c85] transition placeholder-gray-400"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="p-3 border border-[#1b9c85]/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1b9c85] transition placeholder-gray-400"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-[#1b9c85] cursor-pointer hover:bg-[#159872] text-white py-3 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all"
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-500">
          Already have an account?{" "}
          <Link href="/login" className="text-[#1b9c85] font-semibold hover:underline">
            Login
          </Link>
        </p>

        {/* Inline Animations */}
        <style>
          {`
            @keyframes floatGlow {
              0%, 100% { transform: translateY(0); filter: brightness(100%); }
              50% { transform: translateY(-6px); filter: brightness(115%); }
            }
            @keyframes spinGlow {
              0% { transform: rotate(0deg); filter: brightness(100%); }
              50% { filter: brightness(120%); }
              100% { transform: rotate(360deg); filter: brightness(100%); }
            }
            @keyframes spinReverseGlow {
              0% { transform: rotate(360deg); filter: brightness(100%); }
              50% { filter: brightness(120%); }
              100% { transform: rotate(0deg); filter: brightness(100%); }
            }
          `}
        </style>
      </div>
    </div>
  );
};

export default SignupPage;
