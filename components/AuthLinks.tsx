"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

const AuthLinks = () => {
  const [open, setOpen] = useState(false);
  const { status } = useSession();
  return (
    <>
      {status === "unauthenticated" ? (
        <>
          <Link href="/login">Login</Link>
        </>
      ) : (
        <>
          <Link href="/write">Write</Link>
          <span onClick={() => signOut()} className="cursor-pointer">
            Logout
          </span>
        </>
      )}
      <div
        onClick={() => setOpen(!open)}
        className="relative z-50 flex h-5 w-6 cursor-pointer flex-col justify-between gap-1 md:hidden"
      >
        <div
          className={`absolute left-0 top-1/2 h-[2px] w-full rounded-full bg-[var(--textColor)] transition-all duration-500 ${
            open ? "rotate-45" : "-translate-y-2"
          }`}
        />
        <div
          className={`absolute left-0 top-1/2 h-[2px] w-full rounded-full bg-[var(--textColor)] transition-all duration-500 ${
            open ? "-rotate-45" : "translate-y-2"
          }`}
        />
        <div
          className={`absolute left-0 top-1/2 h-[2px] w-full rounded-full bg-[var(--textColor)] transition-all duration-300 ${
            open ? "scale-0 opacity-0" : "scale-100 opacity-100"
          }`}
        />
      </div>
      <div
        className={`fixed left-0 top-0 h-screen w-full transform bg-[var(--bg)] transition-transform duration-500 ease-in-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col items-center justify-center gap-8 text-2xl font-semibold">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="transition-colors hover:text-[var(--softTextColor)]"
          >
            Home
          </Link>
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="transition-colors hover:text-[var(--softTextColor)]"
          >
            Contact
          </Link>
          <Link
            href="/about"
            onClick={() => setOpen(false)}
            className="transition-colors hover:text-[var(--softTextColor)]"
          >
            About
          </Link>
          {status === "unauthenticated" ? (
            <>
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="transition-colors hover:text-[var(--softTextColor)]"
              >
                Login
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/write"
                onClick={() => setOpen(false)}
                className="transition-colors hover:text-[var(--softTextColor)]"
              >
                Write
              </Link>
              <span
                onClick={() => setOpen(false)}
                className="cursor-pointer transition-colors hover:text-[var(--softTextColor)]"
              >
                Logout
              </span>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default AuthLinks;
