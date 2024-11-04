import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/utils/cloudinary";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { message: "No file uploaded" },
        { status: 400 },
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileBase64 = `data:${file.type};base64,${buffer.toString("base64")}`;

    const result = await cloudinary.uploader.upload(fileBase64, {
      folder: "blog",
    });

    return NextResponse.json(
      {
        url: result.secure_url,
        public_id: result.public_id,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    return NextResponse.json(
      { message: "Error uploading image" },
      { status: 500 },
    );
  }
}
