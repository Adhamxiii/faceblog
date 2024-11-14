"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import useSWR from "swr";

const fetcher = async (url: string) => {
  const res = await fetch(url);

  const data = await res.json();

  if (!res.ok) {
    const error = new Error(data.message);
    throw error;
  }

  return data;
};

const Comments = ({ postSlug }: any) => {
  const { status } = useSession();

  const [comment, setComment] = useState("");

  const { data, isLoading, mutate } = useSWR(
    `https://faceblog-ebon.vercel.app/api/comments?postSlug=${postSlug}`,
    fetcher,
  );

  const handleSubmit = async () => {
    try {
      if (!comment.trim()) {
        toast.error("Please write a comment");
        return;
      }

      toast.loading("Posting comment...", { id: "comment" });

      await axios.post(`https://faceblog-ebon.vercel.app/api/comments`, {
        desc: comment,
        postSlug,
      });

      mutate();
      setComment("");
      toast.success("Comment posted successfully!", { id: "comment" });
    } catch (error) {
      console.error("Error posting comment:", error);
      toast.error("Failed to post comment", { id: "comment" });
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="mt-[50px]">
      <h1 className="mb-[30px] text-2xl font-bold text-[var(--softTextColor)]">
        Comments
      </h1>
      {status === "authenticated" ? (
        <div className="flex items-center justify-between gap-[30px] max-md:flex-col">
          <textarea
            name="comment"
            id="comment"
            placeholder="Write your comment here..."
            className="w-full resize-none rounded-[5px] border border-[var(--softTextColor)] p-5 text-xl font-light"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            onClick={handleSubmit}
            className="cursor-pointer rounded-[5px] border-none bg-[#008080] px-5 py-4 text-xl font-bold text-white max-md:w-full"
          >
            Send
          </button>
        </div>
      ) : (
        <Link href="/login">Login to write a comment</Link>
      )}
      <div className="mt-[50px]">
        {data?.map((comment: any) => (
          <div key={comment.id} className="mb-[50px] flex flex-col gap-[20px]">
            <div className="mb-5 flex items-center gap-5">
              <Image
                src={comment.user.image}
                alt="avatar"
                width={50}
                height={50}
                className="size-[50px] rounded-full object-cover"
              />
              <div className="flex flex-col gap-[5px] text-[var(--softTextColor)]">
                <span className="font-medium">{comment.user.name}</span>
                <span className="text-sm">{comment.createdAt}</span>
              </div>
            </div>
            <p className="text-lg font-light">{comment.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;
