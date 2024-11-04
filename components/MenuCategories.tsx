import Link from "next/link";

const categories = [
  {
    id: 1,
    href: "/blog?category=travel",
    title: "Travel",
    bgColor: "bg-[#ff785731]",
  },
  {
    id: 2,
    href: "/blog?category=fashion",
    title: "Fashion",
    bgColor: "bg-[#da85c731]",
  },
  {
    id: 3,
    href: "/blog?category=food",
    title: "Food",
    bgColor: "bg-[#7fb88133]",
  },
  {
    id: 4,
    href: "/blog?category=culture",
    title: "Culture",
    bgColor: "bg-[#ffb14f45]",
  },
  {
    id: 5,
    href: "/blog?category=coding",
    title: "Coding",
    bgColor: "bg-[#5e4fff31]",
  },
  {
    id: 6,
    href: "/blog?category=style",
    title: "Style",
    bgColor: "bg-[#57c4ff31]",
  },
];

const MenuCategories = () => {
  return (
    <>
      <h2 className="text-base font-normal text-[#777]">Discover by topic</h2>
      <h1 className="text-[28px] font-semibold">Categories</h1>
      <div className="mb-[60px] mt-[35px] flex flex-wrap gap-[20px]">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={category.href}
            className={`flex items-center gap-[10px] rounded-[10px] px-[25px] py-[10px] text-[14px] ${category.bgColor}`}
          >
            {category.title}
          </Link>
        ))}
      </div>
    </>
  );
};

export default MenuCategories;
