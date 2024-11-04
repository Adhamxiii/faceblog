"use client";

import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const Login = () => {
  const { status } = useSession();
  const router = useRouter();

  if (status === "loading") return <div>Loading...</div>;

  if (status === "authenticated") {
    router.push("/");
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col gap-[50px] rounded-[10px] bg-[var(--softBg)] px-[200px] py-[70px] max-md:px-[50px]">
        <div
          onClick={() => signIn("google")}
          className="flex cursor-pointer items-center justify-center rounded-[5px] border-none bg-[#ff5555] p-5 font-bold text-white max-sm:text-sm"
        >
          Sign in with Google
        </div>
        <div className="flex cursor-pointer items-center justify-center rounded-[5px] border-none bg-[#111] p-5 font-bold text-white max-sm:text-sm">
          Sign in with Github
        </div>
        <div className="flex cursor-pointer items-center justify-center rounded-[5px] border-none bg-[#087bea] p-5 font-bold text-white max-sm:text-sm">
          Sign in with Facebook
        </div>
      </div>
    </div>
  );
};

export default Login;
