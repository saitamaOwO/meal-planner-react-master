"use client";
import Link from "next/link";
import "@/styles/globals.css";
import Cookies from "js-cookie";
import { signOut } from "@/util/session";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { Schibsted_Grotesk } from "next/font/google";
const font = Schibsted_Grotesk({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  const [username, setUsername] = useState<string>();
  useEffect(() => {
    setUsername(Cookies.get("username"));
  }, []);
  return (
    <div className="w-full flex justify-center">
      <main className={`relative max-w-[1540px] w-full ${font.className}`}>
        <div className="absolute top-5 right-8 flex">
        {username &&(
          <Link
            href={"/signin"}
            className="mr-2 flex items-center justify-center gap-x-1 border px-4 py-1.5 border-zinc-700 rounded-lg text-sm hover:bg-zinc-700 transition-all"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
            {username || "Sign In"}
          </Link>
        )}
        {username&&(
          <button
            onClick={signOut}
            className="border px-4 py-1.5 border-zinc-700 rounded-lg text-sm hover:bg-zinc-700 transition-all"
          >
            Sign Out
          </button>
           )}
        </div>
       
        <Component {...pageProps} />
      </main>
    </div>
  );
}
