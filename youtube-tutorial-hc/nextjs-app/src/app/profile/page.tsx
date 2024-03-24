"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Profile = () => {
  const router = useRouter();
  const [data, setData] = useState("nothing");

  const onBtnClick = async () => {
    try {
      const response = await axios.get("/api/users/logout");
      console.log("Log out successfull!");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const getUserDetails = async () => {
    const res = await axios.get("/api/users/me");
    console.log(res.data.user._id);
    setData(res.data.user._id);
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center gap-8">
      <h1 className="text-3xl">Profile page</h1>
      <h2 className="text-white bg-teal-600 font-semibold p-3">
        {data === "nothing" ? (
          "Nothing"
        ) : (
          <Link href={`/profile/${data}`} className="">
            {data}
          </Link>
        )}
      </h2>
      <button
        className="bg-slate-200 px-8 py-3 text-black font-semibold uppercase cursor-pointer hover:bg-slate-300 focus:bg-slate-300 border-none outline-none "
        onClick={onBtnClick}
      >
        Logout
      </button>

      <button
        className="bg-slate-200 px-8 py-3 text-black font-semibold uppercase cursor-pointer hover:bg-slate-300 focus:bg-slate-300 border-none outline-none "
        onClick={getUserDetails}
      >
        Get user
      </button>
    </div>
  );
};

export default Profile;
