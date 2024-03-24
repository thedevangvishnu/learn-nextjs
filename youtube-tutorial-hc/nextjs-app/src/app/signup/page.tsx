"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";

const Signup = () => {
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.username.length > 0 &&
      user.password.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  const onBtnClick = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup success", response.data);
      router.push("/login");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 gap-4">
      <h1 className="text-3xl font-semibold mb-8">Signup</h1>
      <div className="flex gap-4 items-center">
        <label htmlFor="username" className="font-semibold">
          Username
        </label>
        <input
          id="username"
          type="text"
          placeholder="Enter username"
          className="p-3 text-black"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />
      </div>

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
        className={` px-8 py-3 text-black font-semibold uppercase cursor-pointer hover:bg-slate-300 focus:bg-slate-300 border-none outline-none ${
          buttonDisabled
            ? "bg-slate-800 text-slate-500"
            : "bg-slate-100 text-black"
        }`}
        onClick={onBtnClick}
        disabled={buttonDisabled}
      >
        {isLoading ? "Loading..." : "Sign up"}
      </button>
      <p>
        Have an account?{" "}
        <Link href="/login" className="font-semibold hover:text-slate-200">
          Login here
        </Link>
      </p>
    </div>
  );
};

export default Signup;
