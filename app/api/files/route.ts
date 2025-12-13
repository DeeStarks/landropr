import { type NextRequest, NextResponse } from "next/server";
import {
  addFile,
  getFiles,
  getAllFiles,
  type FileItem,
} from "@/lib/file-store";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const folderId = searchParams.get("folderId");

  const files =
    folderId === "all" ? await getAllFiles() : await getFiles(folderId);

  return NextResponse.json(files);
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const folderId = formData.get("folderId") as string | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const fileItem: FileItem = {
      id: "",
      name: file.name,
      originalName: file.name,
      size: file.size,
      compressedSize: file.size,
      type: file.type || "application/octet-stream",
      folderId: folderId || null,
      createdAt: new Date(),
    };

    await addFile(fileItem, buffer);

    return NextResponse.json(fileItem);
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    );
  }
}
