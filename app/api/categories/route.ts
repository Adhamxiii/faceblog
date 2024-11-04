import { NextResponse } from "next/server";
import prisma from "@/utils/connect";

export const GET = async () => {
  try {
    const categories = await prisma.category.findMany();
    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching categories", error },
      { status: 500 },
    );
  }
}
