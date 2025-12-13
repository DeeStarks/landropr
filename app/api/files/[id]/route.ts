import { type NextRequest, NextResponse } from "next/server";
import { getFile, deleteFile } from "@/lib/file-store";
import fs from "fs/promises";
import path from "path";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: encodedId } = await params;
    const id = decodeURIComponent(encodedId);
    const file = await getFile(id);

    if (!file) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    const filePath = path.join(process.cwd(), "uploads", id);
    const fileBuffer = await fs.readFile(filePath);

    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": file.type,
        "Content-Disposition": `attachment; filename="${encodeURIComponent(
          file.originalName
        )}"`,
        "Content-Length": fileBuffer.length.toString(),
      },
    });
  } catch (error) {
    console.error("Error downloading file:", error);
    return NextResponse.json(
      { error: "Failed to download file" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: encodedId } = await params;
  const id = decodeURIComponent(encodedId);
  const success = await deleteFile(id);

  if (!success) {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
