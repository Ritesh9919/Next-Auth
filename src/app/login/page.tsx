"use client";

import { useState } from "react";
import Link from "next/link";

function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  return (
    <div className="w-[40%] border-2 border-gray-500 mx-auto mt-10 rounded-md p-10">
      <h1 className="text-center text-lg font-bold mb-5">Signup</h1>
      <form className="flex flex-col gap-4">
        <div className="flex flex-col">
          <label htmlFor="email" className="mb-2 text-lg">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={user.email}
            placeholder="Your Email"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className="border-2 border-gray-400 px-3 py-2 rounded-md"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password" className="mb-2 text-lg">
            Password
          </label>
          <input
            type="text"
            id="password"
            value={user.password}
            placeholder="Your Password"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            className="border-2 border-gray-400 px-3 py-2 rounded-md"
          />
        </div>
        <button className="py-2 px-1 border-2 border-black bg-orange-200 font-bold rounded-md mt-3">
          Login
        </button>
        <div className="flex justify-center items-center text-blue-500">
          <span>
            <Link href="/">Forgot Password | </Link>
          </span>
          <span>
            <Link href="/signup">Visit Signup Page</Link>
          </span>
        </div>
      </form>
    </div>
  );
}

export default Login;
