import Link from "next/dist/client/link";
import Image from "next/image";
import ThemeToggle from "./ThemeToggle";
import AuthLinks from "./AuthLinks";

const navLinks = [
  {
    id: 1,
    title: "Home",
    url: "/",
  },
];

const Navbar = () => {
  return (
    <div className="flex h-[100px] items-center justify-between p-5">
      <div className="flex flex-1 items-center gap-[10px] max-md:hidden">
        <Image src="/facebook.png" alt="facebook" width={24} height={24} />
        <Image src="/instagram.png" alt="instagram" width={24} height={24} />
        <Image src="/tiktok.png" alt="tiktok" width={24} height={24} />
        <Image src="/youtube.png" alt="youtube" width={24} height={24} />
      </div>

      <div className="flex-1 text-center max-md:text-left">
        <Link
          href="/"
          className="text-3xl font-extrabold tracking-tight transition-opacity hover:opacity-80 max-lg:text-2xl max-md:text-xl"
        >
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            FaceBlog
          </span>
        </Link>
      </div>

      <div className="flex flex-1 items-center justify-end gap-5 text-xl max-lg:gap-3 max-lg:text-lg">
        <ThemeToggle />
        {navLinks.map((item) => (
          <Link
            key={item.id}
            href={item.url}
            className="hidden capitalize sm:block"
          >
            {item.title}
          </Link>
        ))}
        <AuthLinks />
      </div>
    </div>
  );
};

export default Navbar;
