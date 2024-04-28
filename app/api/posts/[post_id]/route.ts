import connectDB from "@/mongodb/db";
import { Post } from "@/mongodb/models/post";
import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";

export async function GET(
  request: Request,
  { params }: { params: { post_id: string } }
) {
  await connectDB();

  try {
    const post = await Post.findById(params.post_id);

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export interface DeletePostRequestBody {
  userId: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: { post_id: string } }
) {
  auth().protect();

  await connectDB();

  const { userId }: DeletePostRequestBody = await request.json();

  try {
    const post = await Post.findById(params.post_id);
    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }
    if (post.user.userId !== userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    await post.removePost();
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
