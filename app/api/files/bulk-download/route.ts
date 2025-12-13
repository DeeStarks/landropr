import { type NextRequest, NextResponse } from "next/server";
import { getFile } from "@/lib/file-store";
import fs from "fs/promises";
import path from "path";
import JSZip from "jszip";

export async function POST(request: NextRequest) {
  try {
    const { fileIds } = await request.json();

    if (!fileIds || !Array.isArray(fileIds) || fileIds.length === 0) {
      return NextResponse.json(
        { error: "File IDs array required" },
        { status: 400 }
      );
    }

    const zip = new JSZip();

    for (const fileId of fileIds) {
      const file = await getFile(fileId);
      if (!file) {
        console.warn(`File not found: ${fileId}`);
        continue;
      }

      const filePath = path.join(process.cwd(), "uploads", fileId);
      try {
        const fileBuffer = await fs.readFile(filePath);
        zip.file(file.originalName, fileBuffer);
      } catch (error) {
        console.error(`Error reading file ${fileId}:`, error);
      }
    }

    const zipData = await zip.generateAsync({ type: "uint8array" });
    const zipBuffer = Buffer.from(zipData);

    return new NextResponse(zipBuffer, {
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename="files-${Date.now()}.zip"`,
        "Content-Length": zipBuffer.length.toString(),
      },
    });
  } catch (error) {
    console.error("Error creating ZIP:", error);
    return NextResponse.json(
      { error: "Failed to create ZIP file" },
      { status: 500 }
    );
  }
}
