import { type NextRequest, NextResponse } from "next/server";
import {
  addFolder,
  getFolders,
  getBreadcrumbs,
  type Folder,
} from "@/lib/file-store";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const parentId = searchParams.get("parentId");
  const breadcrumbs = searchParams.get("breadcrumbs");

  if (breadcrumbs) {
    const crumbs = await getBreadcrumbs(breadcrumbs);
    return NextResponse.json(crumbs);
  }

  const folders = await getFolders(parentId);
  return NextResponse.json(folders);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, parentId } = body;

    if (!name) {
      return NextResponse.json(
        { error: "Folder name required" },
        { status: 400 }
      );
    }

    const folder: Folder = {
      id: "",
      name,
      parentId: parentId || null,
      createdAt: new Date(),
    };

    await addFolder(folder);

    return NextResponse.json(folder);
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to create folder" },
      { status: 500 }
    );
  }
}
