"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  

  const varifyUserEmail = async () => {
    try {
    
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
    } catch (error: any) {
      console.log(error)
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      varifyUserEmail();
    }
  }, [token]);

  return (
    <div>
      <h1 className="text-center mt-5 text-lg font-bold">Varify Email</h1>
      <h2 className="text-center bg-orange-400 w-[60%] mx-auto mt-3 py-2 rounded-sm" >{token ? token : "No token"}</h2>
      {verified && (
        <div className="flex justify-center items-center mt-5 gap-3">
          <h2 className="font-bold">Email varified</h2>
          <Link href='/login' className="text-blue-500 underline">Login</Link>
        </div>
      )}
      
    </div>
  );
}

export default VerifyEmailPage;
