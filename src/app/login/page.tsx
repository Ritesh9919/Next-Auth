"use client";

import { useState } from "react";
import Link from "next/link";
import {toast} from 'react-hot-toast'
import {useRouter} from 'next/navigation'
import axios from "axios";

function Login() {
  const router = useRouter()
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [loading,setLoading] = useState(false)


  const onLogin = async()=> {
    try {
      setLoading(true)
      const response = await axios.post('/api/users/login',user)
      if(response.data.success) {
        toast.success(response.data.message)
        router.push('/profile')
      }
    } catch (error:any) {
      toast.error(error.message)
    }
  }


  return (
    <div className="w-[40%] border-2 border-gray-500 mx-auto mt-10 rounded-md p-10">
      <h1 className="text-center text-lg font-bold mb-5">Login</h1>
      <div className="flex flex-col gap-4">
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
        <button className="py-2 px-1 border-2 border-black bg-orange-200 font-bold rounded-md mt-3" onClick={onLogin}>
          Login
        </button>
        <div className="flex justify-center items-center text-blue-500">
          <span>
            <Link href="/signup">Visit Signup Page</Link>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Login;
