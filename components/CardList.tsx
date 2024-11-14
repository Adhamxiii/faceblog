import Pagination from "./Pagination";
import Card from "./Card";
import axios from "axios";
import { cache } from "react";

const getPosts = cache(async (page: number, category?: string) => {
  try {
    const posts = await axios.get(
      `https://faceblog-ebon.vercel.app/api/posts?page=${page}&category=${category || ""}`,
      { timeout: 5000 },
    );
    if (posts.status !== 200) {
      throw new Error("Failed to fetch posts");
    }
    return posts.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
});

const CardList = async ({
  page,
  category,
}: {
  page: number;
  category?: string;
}) => {
  const { posts, count } = await getPosts(page, category);
  return (
    <div className="flex-[5]" key={page}>
      <h1 className="my-[50px] text-4xl font-semibold">Recent Posts</h1>
      
      {posts?.map((post: any) => <Card key={post._id} post={post} />)}
    
      <Pagination
        page={page}
        hasPrevious={5 * (page - 1) > 0}
        hasNext={5 * (page - 1) + 5 < count}
      />
    </div>
  );
};

export default CardList;
