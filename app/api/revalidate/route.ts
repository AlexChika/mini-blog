import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const path = request.nextUrl.searchParams.get("path") || "/";
  const secret = request.nextUrl.searchParams.get("secret");

  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json(
      { revalidated: false, message: "Invalid secret" },
      { status: 401 }
    );
  }

  if (!path) {
    return NextResponse.json(
      { revalidated: false, message: "Invalid path" },
      { status: 400 }
    );
  }
  console.log({ path });
  revalidatePath(path, "page");

  return NextResponse.json({
    revalidated: true,
    message: "revalidated successfully",
  });
}
