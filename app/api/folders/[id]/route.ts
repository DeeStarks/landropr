import { type NextRequest, NextResponse } from "next/server"
import { getFolder, deleteFolder } from "@/lib/file-store"

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const folder = getFolder(id)

  if (!folder) {
    return NextResponse.json({ error: "Folder not found" }, { status: 404 })
  }

  return NextResponse.json(folder)
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  if (id === "root") {
    return NextResponse.json({ error: "Cannot delete root folder" }, { status: 400 })
  }

  const success = deleteFolder(id)

  if (!success) {
    return NextResponse.json({ error: "Folder not found" }, { status: 404 })
  }

  return NextResponse.json({ success: true })
}
