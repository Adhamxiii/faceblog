import Image from "next/image";
import Link from "next/link";

const Card = ({ post }: { post: any }) => {
  return (
    <div className="mb-[50px] flex items-center gap-[50px] max-md:flex-col">
      <div className="relative h-[350px] flex-1 max-md:hidden">
        {post.imageUrl && (
          <Image src={post.imageUrl} alt="post" fill className="object-cover" />
        )}
      </div>
      <div className="flex flex-1 flex-col gap-[30px]">
        <div className="flex items-center gap-[10px]">
          <span className="text-[#777]">
            {new Date(post.createdAt).toLocaleDateString("en-US", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>
          <span className="text-[#777]">-</span>
          <span className="font-medium uppercase text-[#dc143c]">
            {post.catSlug}
          </span>
        </div>
        <Link href={`/posts/${post.slug}`}>
          <h1 className="text-2xl font-semibold">{post.title}</h1>
        </Link>
        <p
          className="line-clamp-4 text-lg font-light text-[var(--softTextColor)]" 
          dangerouslySetInnerHTML={{ __html: post.desc }}
        ></p>
        <Link
          href={`/posts/${post.slug}`}
          className="w-max border-b border-[#dc143c] py-[2px] font-medium"
        >
          Read More
        </Link>
      </div>
    </div>
  );
};

export default Card;
