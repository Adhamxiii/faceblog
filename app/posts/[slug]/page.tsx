import Comments from "@/components/Comments";
import Menu from "@/components/Menu";
import axios from "axios";
import Image from "next/image";

const getPost = async (slug: string) => {
  try {
    const res = await axios.get(
      `https://faceblog-ebon.vercel.app/api/posts/${slug}`,
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching post:", error);
    throw new Error("Failed to fetch post data.");
  }
};

const BlogIdPage = async ({ params }: any) => {
  const { slug } = params;
  const post = await getPost(slug);
  return (
    <div>
      <div className="flex items-center gap-[50px] max-md:flex-col">
        <div className="flex-1">
          <h1 className="mb-[50px] text-6xl font-bold max-lg:text-4xl max-md:mb-4">
            {post.title}
          </h1>
          <div className="flex items-center gap-5">
            <div className="relative size-[50px]">
              {post.user.image && (
                <Image
                  src={post.user.image}
                  alt="author"
                  fill
                  className="rounded-full object-cover"
                />
              )}
            </div>
            <div className="flex flex-col gap-[5px] text-[var(--softTextColor)]">
              <span className="text-xl font-medium">
                {post.user.name}
              </span>
              <span>
                {new Date(post.createdAt).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>
        </div>
        <div className="relative h-[350px] w-full overflow-hidden rounded-2xl lg:flex-1">
          {post.imageUrl && (
            <Image
              src={post.imageUrl}
              alt="blog"
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
          )}
        </div>
      </div>
      <div className="flex gap-[50px] max-md:flex-col">
        <div className="mt-[60px] flex-[5] max-lg:mt-4">
          <div
            className="flex flex-col gap-5 text-xl font-light"
            dangerouslySetInnerHTML={{ __html: post.desc }}
          ></div>
          <div>
            <Comments postSlug={slug} />
          </div>
        </div>
        <Menu />
      </div>
    </div>
  );
};

export default BlogIdPage;
