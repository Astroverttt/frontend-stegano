"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_DEV_LINK}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          // credentials: "include",
          body: JSON.stringify({ email, password }),
        }
      );

      if (!res.ok) {
        console.log("Status gagal:", res.status);
        throw new Error("Login gagal. Cek kembali akunmu.");
      }

      const data = await res.json();
      localStorage.setItem("access_token", data.access_token);
      router.push("/");
    } catch (err: any) {
      setErrorMsg(err.message || "Terjadi kesalahan.");
    }
  };

  return (
    <div className="min-h-screen flex bg-white text-black">
      {/* Kiri: Gambar */}
      <div className="hidden md:block w-1/2 relative">
        <Image
          src="/f1-login.jpg" //
          alt="Login Background"
          fill
          className="object-cover"
        />
      </div>

      {/* Kanan: Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-6 py-12">
        <div className="max-w-md w-full">
          <h2 className="text-3xl font-bold mb-6">Nice to see you again</h2>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label htmlFor="remember" className="flex items-center gap-2">
                <input type="checkbox" className="accent-blue-600" />
                Remember me
              </label>
              <Link href="#" className="text-blue-500 hover:underline">
                Forgot password?
              </Link>
            </div>

            {errorMsg && (
              <p className="text-red-500 text-sm text-center">{errorMsg}</p>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition"
            >
              Sign in
            </button>
          </form>

          <div className="text-center text-sm mt-6">
            Don’t have an account?{" "}
            <Link href="/register" className="text-blue-500 hover:underline">
              Sign up now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
