import MenuCategories from "./MenuCategories";
import MenuPosts from "./MenuPosts";

const popularPosts = [
  {
    href: "/",
    imgSrc: "/p1.jpeg",
    imgAlt: "travel post",
    category: "Travel",
    categoryBg: "bg-[#ff7857]",
    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    author: "Adham Nasser",
    date: "22.06.2024",
  },
  {
    href: "/",
    imgSrc: "/p1.jpeg",
    imgAlt: "fashion post",
    category: "Fashion",
    categoryBg: "bg-[#ff7887]",
    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    author: "Adham Nasser",
    date: "22.06.2024",
  },
  {
    href: "/",
    imgSrc: "/p1.jpeg",
    imgAlt: "food post",
    category: "Food",
    categoryBg: "bg-[#7fb881]",
    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    author: "Adham Nasser",
    date: "22.06.2024",
  },
  {
    href: "/",
    imgSrc: "/p1.jpeg",
    imgAlt: "culture post",
    category: "Culture",
    categoryBg: "bg-[#ffb14f]",
    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    author: "Adham Nasser",
    date: "22.06.2024",
  },
  {
    href: "/",
    imgSrc: "/p1.jpeg",
    imgAlt: "coding post",
    category: "Coding",
    categoryBg: "bg-[#775aec]",
    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    author: "Adham Nasser",
    date: "22.06.2024",
  },
  {
    href: "/",
    imgSrc: "/p1.jpeg",
    imgAlt: "style post",
    category: "Style",
    categoryBg: "bg-[#789cff]",
    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    author: "Adham Nasser",
    date: "22.06.2024",
  },
];

const Menu = () => {
  return (
    <div className="mt-[60px] flex-[2] max-md:hidden">
      <MenuPosts popularPosts={popularPosts} />
      <MenuCategories />
      <MenuPosts popularPosts={popularPosts} withImage />
    </div>
  );
};

export default Menu;
