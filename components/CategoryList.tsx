import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { cache } from 'react';

enum CategoryBackgrounds {
  Style = "bg-[#57c4ff31]",
  Fashion = "bg-[#da85c731]",
  Food = "bg-[#7fb88133]",
  Travel = "bg-[#ff795736]",
  Culture = "bg-[#ffb04f45]",
  Coding = "bg-[#5e4fff31]",
}

const getCategories = cache(async () => {
  try {
    const categories = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/categories`,
      { timeout: 10000 }
    );
    if (categories.status !== 200) {
      throw new Error("Failed to fetch categories");
    }
    return categories.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
});
  
const backgroundCache = new Map<string, string>();
const getCategoryBackground = (title: string): string => {
  if (backgroundCache.has(title)) {
    return backgroundCache.get(title)!;
  }
  const normalizedTitle = title.charAt(0).toUpperCase() + title.slice(1).toLowerCase();
  const background = CategoryBackgrounds[normalizedTitle as keyof typeof CategoryBackgrounds] || "bg-gray-100";
  backgroundCache.set(title, background);
  return background;
};

const CategoryList = async () => {
  const categories = await getCategories();
  
  return (
    <div>
      <h1 className="my-[50px] text-4xl font-semibold max-lg:text-3xl max-md:text-2xl">
        Popular Categories
      </h1>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {categories.map((category: any) => (
          <Link
            key={category.id}
            href={`/blog?category=${category.slug}`}
            className={`flex h-[80px] w-full items-center justify-center gap-[10px] rounded-[10px] capitalize ${getCategoryBackground(category.title)}`}
          >
            <Image
              src={category.img}
              alt={category.title}
              width={32}
              height={32}
              className="h-[32px] w-[32px] rounded-full object-cover"
              priority={false}
              loading="lazy"
            />
            {category.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
