"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";

const LoginPage = () => {
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  const onBtnClick = async () => {
    try {
      setIsLoading(true);

      const response = await axios.post("/api/users/login", user);
      console.log("Login success!", response.data);
      router.push("/profile");
    } catch (error) {
      console.log("Error loggin in", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 gap-4">
      <h1 className="text-3xl font-semibold mb-8">Login</h1>

      <div className="flex gap-4 items-center">
        <label htmlFor="email" className="font-semibold">
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="Enter email"
          className="p-3 text-black"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
      </div>

      <div className="flex gap-4 items-center">
        <label htmlFor="password" className="font-semibold">
          Password
        </label>
        <input
          id="password"
          type="password"
          placeholder="Enter password"
          className="p-3 text-black"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
      </div>

      <button
        className="bg-slate-200 px-8 py-3 text-black font-semibold uppercase cursor-pointer hover:bg-slate-300 focus:bg-slate-300 border-none outline-none"
        onClick={onBtnClick}
        disabled={buttonDisabled}
      >
        {isLoading ? "Loading..." : "Sign in"}
      </button>
      <p>
        Don't have an account?{" "}
        <Link href="/signup" className="font-semibold hover:text-slate-200">
          Sign up here
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
