import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/connect";
import { getAuthSession } from "@/utils/auth";

export const GET = async (req: NextRequest) => {
  const page = parseInt(req.nextUrl.searchParams.get("page") || "1");
  const category = req.nextUrl.searchParams.get("category") || "";
  try {
    const [posts, count] = await prisma.$transaction([
      prisma.post.findMany({
        skip: (page - 1) * 5,
        take: 5,
        where: {
          ...(category && { catSlug: category }),
        },
      }),
      prisma.post.count({
        where: {
          ...(category && { catSlug: category }),
        },
      }),
    ]);
    return NextResponse.json({ posts, count }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch posts", error },
      { status: 500 },
    );
  }
};

export const POST = async (req: NextRequest) => {
  const session = await getAuthSession();

  if (!session) {
    return NextResponse.json(
      { message: "Not Authenticated!" },
      { status: 401 },
    );
  }

  try {
    const { title, desc, imageUrl, slug, catSlug } = await req.json();

    const post = await prisma.post.create({
      data: {
        title,
        desc,
        imageUrl,
        slug,
        catSlug,
        userEmail: session?.user?.email!,
      },
    });

    return NextResponse.json(post, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 },
    );
  }
};
