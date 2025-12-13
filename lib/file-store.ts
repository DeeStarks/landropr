import fs from "fs/promises";
import path from "path";
import { existsSync } from "fs";

export interface FileItem {
  id: string;
  name: string;
  originalName: string;
  size: number;
  compressedSize: number;
  type: string;
  folderId: string | null;
  createdAt: Date;
}

export interface Folder {
  id: string;
  name: string;
  parentId: string | null;
  createdAt: Date;
}

const ROOT_DIR = path.join(process.cwd(), "uploads");

if (!existsSync(ROOT_DIR)) {
  fs.mkdir(ROOT_DIR, { recursive: true }).catch(console.error);
}

function getAbsolutePath(relativePath: string | null): string {
  if (!relativePath || relativePath === "root") {
    return ROOT_DIR;
  }
  const safePath = path.normalize(relativePath).replace(/^(\.\.[\/\\])+/, "");
  return path.join(ROOT_DIR, safePath);
}

function getRelativePath(absolutePath: string): string {
  const relative = path.relative(ROOT_DIR, absolutePath);
  return relative === "" ? "root" : relative;
}

export async function getFiles(
  folderId: string | null = null
): Promise<FileItem[]> {
  const dirPath = getAbsolutePath(folderId);

  try {
    const entries = await fs.readdir(dirPath, { withFileTypes: true });
    const files: FileItem[] = [];

    for (const entry of entries) {
      if (entry.isFile()) {
        const stats = await fs.stat(path.join(dirPath, entry.name));
        files.push({
          id: getRelativePath(path.join(dirPath, entry.name)),
          name: entry.name,
          originalName: entry.name,
          size: stats.size,
          compressedSize: stats.size, // no compression for now
          type: "application/octet-stream", // TODO: detect mime type
          folderId: folderId === "root" ? null : folderId,
          createdAt: stats.birthtime,
        });
      }
    }

    return files.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  } catch (error) {
    console.error("Error reading files:", error);
    return [];
  }
}

export async function getAllFiles(): Promise<FileItem[]> {
  async function traverse(dir: string): Promise<FileItem[]> {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    let results: FileItem[] = [];

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        results = results.concat(await traverse(fullPath));
      } else {
        const stats = await fs.stat(fullPath);
        results.push({
          id: getRelativePath(fullPath),
          name: entry.name,
          originalName: entry.name,
          size: stats.size,
          compressedSize: stats.size,
          type: "application/octet-stream",
          folderId:
            getRelativePath(dir) === "root" ? null : getRelativePath(dir),
          createdAt: stats.birthtime,
        });
      }
    }
    return results;
  }

  try {
    const files = await traverse(ROOT_DIR);
    return files.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  } catch (error) {
    console.error("Error getting all files:", error);
    return [];
  }
}

export async function getFile(id: string): Promise<FileItem | undefined> {
  const filePath = getAbsolutePath(id);
  try {
    const stats = await fs.stat(filePath);
    return {
      id: id,
      name: path.basename(id),
      originalName: path.basename(id),
      size: stats.size,
      compressedSize: stats.size,
      type: "application/octet-stream",
      folderId:
        getRelativePath(path.dirname(filePath)) === "root"
          ? null
          : getRelativePath(path.dirname(filePath)),
      createdAt: stats.birthtime,
    };
  } catch {
    return undefined;
  }
}

export async function addFile(file: FileItem, buffer: Buffer): Promise<void> {
  const folderPath = getAbsolutePath(file.folderId);
  const filePath = path.join(folderPath, file.name);
  await fs.writeFile(filePath, buffer);
}

export async function deleteFile(id: string): Promise<boolean> {
  try {
    await fs.unlink(getAbsolutePath(id));
    return true;
  } catch {
    return false;
  }
}

export async function getFolders(
  parentId: string | null = null
): Promise<Folder[]> {
  const dirPath = getAbsolutePath(parentId);

  try {
    const entries = await fs.readdir(dirPath, { withFileTypes: true });
    const folders: Folder[] = [];

    for (const entry of entries) {
      if (entry.isDirectory()) {
        const stats = await fs.stat(path.join(dirPath, entry.name));
        folders.push({
          id: getRelativePath(path.join(dirPath, entry.name)),
          name: entry.name,
          parentId: parentId === "root" ? null : parentId,
          createdAt: stats.birthtime,
        });
      }
    }

    return folders.sort((a, b) => a.name.localeCompare(b.name));
  } catch (error) {
    console.error("Error reading folders:", error);
    return [];
  }
}

export async function getFolder(id: string): Promise<Folder | undefined> {
  const folderPath = getAbsolutePath(id);
  try {
    const stats = await fs.stat(folderPath);
    if (!stats.isDirectory()) return undefined;

    return {
      id: id,
      name: path.basename(id),
      parentId:
        getRelativePath(path.dirname(folderPath)) === "root"
          ? null
          : getRelativePath(path.dirname(folderPath)),
      createdAt: stats.birthtime,
    };
  } catch {
    return undefined;
  }
}

export async function addFolder(folder: Folder): Promise<void> {
  const parentPath = getAbsolutePath(folder.parentId);
  const folderPath = path.join(parentPath, folder.name);
  await fs.mkdir(folderPath, { recursive: true });
}

export async function deleteFolder(id: string): Promise<boolean> {
  try {
    await fs.rm(getAbsolutePath(id), { recursive: true, force: true });
    return true;
  } catch {
    return false;
  }
}

export async function getBreadcrumbs(
  folderId: string | null
): Promise<Folder[]> {
  const breadcrumbs: Folder[] = [];
  if (!folderId || folderId === "root") return breadcrumbs;

  let currentPath = folderId;

  while (currentPath && currentPath !== "root") {
    const folder = await getFolder(currentPath);
    if (folder) {
      breadcrumbs.unshift(folder);
      const parentDir = path.dirname(currentPath);
      currentPath = parentDir === "." ? "root" : parentDir;
    } else {
      break;
    }
  }

  return breadcrumbs;
}
