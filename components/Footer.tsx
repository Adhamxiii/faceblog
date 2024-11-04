import Image from "next/image";

const footerData = [
  {
    title: "Links",
    items: [
      { label: "Home", href: "/" },
      { label: "Blog", href: "/blog" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Tags",
    items: [
      { label: "Style", href: "/tag/style" },
      { label: "Fashion", href: "/tag/fashion" },
      { label: "Coding", href: "/tag/coding" },
      { label: "Travel", href: "/tag/travel" },
    ],
  },
  {
    title: "Social",
    items: [
      { label: "Facebook", href: "#" },
      { label: "Instagram", href: "#" },
      { label: "TikTok", href: "#" },
      { label: "YouTube", href: "#" },
    ],
  },
];

const socialIcons = [
  { src: "/facebook.png", alt: "facebook" },
  { src: "/instagram.png", alt: "instagram" },
  { src: "/tiktok.png", alt: "tiktok" },
  { src: "/youtube.png", alt: "youtube" },
];

const Footer = () => {
  return (
    <footer className="mt-[50px] flex items-center justify-between py-5 text-[var(--softTextColor)] max-md:flex-col gap-5">
      <div className="flex flex-1 flex-col gap-[14px]">
        <div className="flex items-center gap-[10px]">
          <Image
            src="/logo.png"
            alt="logo"
            width={50}
            height={50}
            className="size-[50px] object-cover"
          />
          <h1 className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-[24px] font-bold text-transparent">
            FaceBlog
          </h1>
        </div>
        <p className="text-sm font-light">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni
          laborum quia sapiente impedit id, expedita repudiandae cumque
          laudantium, explicabo accusamus nobis facilis ea, nemo sit debitis
          rerum assumenda porro mollitia.
        </p>
        <div className="mt-[10px] flex items-center gap-[10px]">
          {socialIcons.map((icon) => (
            <Image
              key={icon.alt}
              src={icon.src}
              alt={icon.alt}
              width={24}
              height={24}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-1 justify-end gap-20 max-md:gap-12">
        {footerData.map((column) => (
          <div key={column.title} className="max-md:w-full">
            <h2 className="mb-4 text-xl font-bold">{column.title}</h2>
            <ul className="space-y-2">
              {column.items.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-[var(--softTextColor)] hover:text-[var(--textColor)]"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
