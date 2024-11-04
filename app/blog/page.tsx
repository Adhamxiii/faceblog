"use client";
import CardList from "@/components/CardList";
import Menu from "@/components/Menu";
import { useSearchParams } from "next/navigation";

enum CategoryBackgrounds {
  Style = "bg-[#789cff]",
  Fashion = "bg-[#da85c7]",
  Food = "bg-[#7fb881]",
  Travel = "bg-[#ff7957]",
  Culture = "bg-[#ffb04f]",
  Coding = "bg-[#5e4fff]",
}

const BlogPage = () => {
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const category = searchParams.get("category") || "";

  const backgroundCache = new Map<string, string>();
  const getCategoryBackground = (title: string): string => {
    if (backgroundCache.has(title)) {
      return backgroundCache.get(title)!;
    }
    const normalizedTitle =
      title.charAt(0).toUpperCase() + title.slice(1).toLowerCase();
    const background =
      CategoryBackgrounds[
        normalizedTitle as keyof typeof CategoryBackgrounds
      ] || "bg-gray-100";
    backgroundCache.set(title, background);
    return background;
  };

  return (
    <div className="container">
      <h1
        className={`rounded-lg ${getCategoryBackground(category)} px-[10px] py-[5px] text-center text-4xl font-bold capitalize text-white`}
      >
        {category ? category : ""} Blog
      </h1>
      <div className="flex gap-[50px] max-md:flex-col">
        <CardList page={page} category={category} />
        <Menu />
      </div>
    </div>
  );
};

export default BlogPage;
