import Image from "next/image";
import Link from "next/link";

const MenuPosts = ({
  popularPosts,
  withImage,
}: {
  popularPosts: any;
  withImage?: boolean;
}) => {
  return (
    <>
      {withImage ? (
        <>
          <h2 className="text-base font-normal text-[#777]">What&apos;s hot</h2>
          <h1 className="text-[28px] font-semibold">Most Popular</h1>
        </>
      ) : (
        <>
          <h2 className="text-base font-normal text-[#777]">
            Discover by topic
          </h2>
          <h1 className="text-[28px] font-semibold">Editors Pick</h1>
        </>
      )}
      <div className="mb-[60px] mt-[35px] flex flex-col gap-[35px]">
        {popularPosts.map((post: any, index: number) => (
          <Link
            key={index}
            href={post.href}
            className="flex items-center gap-[20px]"
          >
            {withImage && (
              <div className="relative aspect-square flex-1">
                <Image
                  src={post.imgSrc}
                  alt={post.imgAlt}
                  fill
                  className="rounded-full border-[3px] border-[#d3d3d3] object-cover"
                />
              </div>
            )}
            <div className="flex flex-[4] flex-col gap-[5px]">
              <span
                className={`w-max rounded-[10px] px-[8px] py-[3px] text-[12px] text-white ${post.categoryBg}`}
              >
                {post.category}
              </span>
              <h3 className="text-[18px] font-medium text-[var(--softTextColor)]">
                {post.title}
              </h3>
              <div className="flex items-center gap-[3px] text-[12px]">
                <span>{post.author} - </span>
                <span className="text-[#777]">{post.date}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default MenuPosts;
