"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useEffect, useState } from "react";
import toast from "react-hot-toast";
const Editor = dynamic(() => import("@/components/Editor"), { ssr: false });

const Write = () => {
  const { status } = useSession();
  const router = useRouter();

  const [open, setOpen] = useState(false);

  const [uploading, setUploading] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [catSlug, setCatSlug] = useState("");

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (status === "loading") return <div>Loading...</div>;

  if (status === "unauthenticated") router.push("/");

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0];
      if (!file) return;

      setUploading(true);
      toast.loading("Uploading image...", { id: "upload" });

      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      const data = await res.json();
      setImageUrl(data.url);
      toast.success("Image uploaded successfully!", { id: "upload" });
      console.log("Uploaded image URL:", data.url);
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image", { id: "upload" });
    } finally {
      setUploading(false);
    }
  };

  const slugify = (str: string) =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const handlePublish = async () => {
    try {
      if (!title.trim()) {
        toast.error("Please enter a title");
        return;
      }
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = content;
      const textContent = tempDiv.textContent || tempDiv.innerText;

      if (!textContent?.trim()) {
        toast.error("Please add some content to your post");
        return;
      }

      toast.loading("Publishing your post...", { id: "publish" });

      const res = await axios.post(
        `https://faceblog-ebon.vercel.app/api/posts`,
        {
          title,
          desc: content,
          imageUrl,
          slug: slugify(title),
          catSlug: catSlug || "style",
        },
      );

      console.log(res);

      toast.success("Post published successfully!", { id: "publish" });
    } catch (error) {
      console.error("Error publishing:", error);
      toast.error("Failed to publish post", { id: "publish" });
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Title"
          className="border-none bg-transparent p-[50px] text-[64px] font-bold outline-none placeholder:text-[#b3b3b1]"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <select
          className="px-5 py-[10px] bg-[var(--bg)]"
          onChange={(e) => setCatSlug(e.target.value)}
        >
          <option value="style">style</option>
          <option value="fashion">fashion</option>
          <option value="food">food</option>
          <option value="culture">culture</option>
          <option value="travel">travel</option>
          <option value="coding">coding</option>
        </select>
      </div>
      <div className="flex h-[700px] gap-5">
        <div ref={menuRef} className="relative flex gap-2">
          <button
            onClick={() => setOpen((prev) => !prev)}
            className="flex size-9 cursor-pointer items-center justify-center rounded-full border border-[var(--textColor)] bg-transparent transition-all duration-300 ease-in-out hover:bg-[#333] hover:text-[var(--backgroundColor)]"
          >
            <Image src="/plus.png" alt="file" width={16} height={16} />
          </button>
          <div
            className={`absolute left-12 top-0 z-50 flex gap-5 transition-all duration-300 ${open ? "translate-x-0 opacity-100 motion-duration-[0.15s]/blur motion-duration-[0.38s]/opacity motion-duration-[0.42s]/rotate motion-delay-[0.38s]/scale motion-delay-[0.60s]/blur motion-ease-spring-bouncier motion-scale-in-[0.5] motion-translate-x-in-[-118%] motion-rotate-in-[-1080deg] motion-blur-in-[10px] motion-opacity-in-[33%]" : "pointer-events-none -translate-x-4 opacity-0"}`}
          >
            <input
              type="file"
              id="image"
              onChange={handleImageUpload}
              accept="image/*"
              className="hidden"
              disabled={uploading}
            />
            <button className="flex size-9 cursor-pointer items-center justify-center rounded-full border border-[#1a8917] bg-transparent transition-all duration-300 ease-in-out hover:bg-[#333] hover:text-[var(--backgroundColor)]">
              <label htmlFor="image">
                <Image src="/image.png" alt="file" width={16} height={16} />
              </label>
            </button>
            <button className="flex size-9 cursor-pointer items-center justify-center rounded-full border border-[#1a8917] bg-transparent transition-all duration-300 ease-in-out hover:bg-[#333] hover:text-[var(--backgroundColor)]">
              <Image src="/external.png" alt="file" width={16} height={16} />
            </button>
            <button className="flex size-9 cursor-pointer items-center justify-center rounded-full border border-[#1a8917] bg-transparent transition-all duration-300 ease-in-out hover:bg-[#333] hover:text-[var(--backgroundColor)]">
              <Image src="/video.png" alt="file" width={16} height={16} />
            </button>
          </div>
        </div>
        <Editor value={content} setValue={setContent} />
      </div>
      <button
        onClick={handlePublish}
        className="absolute right-5 top-[30px] w-fit cursor-pointer rounded-full border-none bg-[#1a8917] px-5 py-[10px] text-white"
      >
        Publish
      </button>
    </div>
  );
};

export default Write;
