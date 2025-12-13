"use client";

import type React from "react";

import { useState, useCallback, useRef, useEffect } from "react";
import useSWR, { mutate } from "swr";
import { toast } from "sonner";
import { OnlineUsers } from "@/components/online-users";
import { usePresence } from "@/hooks/use-presence";
import {
  Folder,
  File,
  Upload,
  FolderPlus,
  Download,
  Trash2,
  ChevronRight,
  Home,
  Loader2,
  Search,
  Grid,
  List,
  MoreVertical,
  CheckSquare,
  Square,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface FileItem {
  id: string;
  name: string;
  originalName: string;
  size: number;
  compressedSize: number;
  type: string;
  folderId: string | null;
  createdAt: string;
}

interface FolderItem {
  id: string;
  name: string;
  parentId: string | null;
  createdAt: string;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return (
    Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  );
}

function getFileIcon(name: string) {
  const extension = name.split(".").pop() || "";
  const extensionMap = {
    image: ["png", "jpg", "jpeg", "gif", "webp", "svg"],
    video: ["mp4", "webm", "ogg", "avi", "mkv"],
    audio: ["mp3", "wav", "ogg", "flac", "aac"],
    pdf: ["pdf"],
    zip: ["zip", "rar", "7z"],
    text: ["txt", "md", "csv", "json", "xml"],
  };

  if (extensionMap.image.includes(extension)) return "🖼️";
  if (extensionMap.video.includes(extension)) return "🎬";
  if (extensionMap.audio.includes(extension)) return "🎵";
  if (extensionMap.pdf.includes(extension)) return "📄";
  if (extensionMap.zip.includes(extension)) return "📦";
  if (extensionMap.text.includes(extension)) return "📝";
  return "📎";
}

export function FileExplorer() {
  const [currentFolderId, setCurrentFolderId] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const [folderDialogOpen, setFolderDialogOpen] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFiles, setSelectedFiles] = useState<Set<string>>(new Set());
  const [isDownloadingBulk, setIsDownloadingBulk] = useState(false);

  const {
    notifyFileUpload,
    notifyFileDelete,
    notifyFolderCreate,
    notifyFolderDelete,
    socket,
  } = usePresence();

  const { data: files = [], isLoading: filesLoading } = useSWR<FileItem[]>(
    `/api/files?folderId=${currentFolderId || ""}`,
    fetcher
  );

  const { data: folders = [], isLoading: foldersLoading } = useSWR<
    FolderItem[]
  >(`/api/folders?parentId=${currentFolderId || ""}`, fetcher);

  const { data: breadcrumbs = [] } = useSWR<FolderItem[]>(
    currentFolderId ? `/api/folders?breadcrumbs=${currentFolderId}` : null,
    fetcher
  );

  const refreshData = useCallback(() => {
    mutate(`/api/files?folderId=${currentFolderId || ""}`);
    mutate(`/api/folders?parentId=${currentFolderId || ""}`);
  }, [currentFolderId]);

  useEffect(() => {
    if (!socket) return;

    const handleFileAdded = () => {
      refreshData();
      toast.info("A file was uploaded by another user");
    };

    const handleFileRemoved = () => {
      refreshData();
      toast.info("A file was deleted by another user");
    };

    const handleFolderAdded = () => {
      refreshData();
      toast.info("A folder was created by another user");
    };

    const handleFolderRemoved = () => {
      refreshData();
      toast.info("A folder was deleted by another user");
    };

    socket.on("file-added", handleFileAdded);
    socket.on("file-removed", handleFileRemoved);
    socket.on("folder-added", handleFolderAdded);
    socket.on("folder-removed", handleFolderRemoved);

    return () => {
      socket.off("file-added", handleFileAdded);
      socket.off("file-removed", handleFileRemoved);
      socket.off("folder-added", handleFolderAdded);
      socket.off("folder-removed", handleFolderRemoved);
    };
  }, [socket, refreshData]);

  const handleFileUpload = async (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;

    setIsUploading(true);

    for (const file of Array.from(fileList)) {
      const formData = new FormData();
      formData.append("file", file);
      if (currentFolderId) {
        formData.append("folderId", currentFolderId);
      }

      try {
        const response = await fetch("/api/files", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) throw new Error("Upload failed");

        const uploadedFile = await response.json();
        toast.success(`Uploaded ${file.name}`);
        notifyFileUpload(uploadedFile);
      } catch {
        toast.error(`Failed to upload ${file.name}`);
      }
    }

    setIsUploading(false);
    refreshData();
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleCreateFolder = async () => {
    if (!newFolderName.trim()) return;

    try {
      const response = await fetch("/api/folders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newFolderName.trim(),
          parentId: currentFolderId,
        }),
      });

      if (!response.ok) throw new Error("Failed to create folder");

      const createdFolder = await response.json();
      toast.success(`Created folder: ${newFolderName}`);
      setNewFolderName("");
      setFolderDialogOpen(false);
      refreshData();
      notifyFolderCreate(createdFolder);
    } catch {
      toast.error("Failed to create folder");
    }
  };

  const handleDownload = async (file: FileItem) => {
    try {
      const response = await fetch(`/api/files/${encodeURIComponent(file.id)}`);
      if (!response.ok) throw new Error("Download failed");

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = file.originalName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast.success(`Downloaded ${file.originalName}`);
    } catch {
      toast.error("Failed to download file");
    }
  };

  const handleDeleteFile = async (file: FileItem) => {
    try {
      const response = await fetch(
        `/api/files/${encodeURIComponent(file.id)}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) throw new Error("Delete failed");

      toast.success(`Deleted ${file.originalName}`);
      refreshData();
      notifyFileDelete(file.id);
    } catch {
      toast.error("Failed to delete file");
    }
  };

  const handleDeleteFolder = async (folder: FolderItem) => {
    try {
      const response = await fetch(`/api/folders/${folder.id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Delete failed");

      toast.success(`Deleted folder: ${folder.name}`);
      refreshData();
      notifyFolderDelete(folder.id);
    } catch {
      toast.error("Failed to delete folder");
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    handleFileUpload(e.dataTransfer.files);
  };

  const toggleFileSelection = (fileId: string) => {
    setSelectedFiles((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(fileId)) {
        newSet.delete(fileId);
      } else {
        newSet.add(fileId);
      }
      return newSet;
    });
  };

  const selectAllFiles = () => {
    setSelectedFiles(new Set(filteredFiles.map((f) => f.id)));
  };

  const clearSelection = () => {
    setSelectedFiles(new Set());
  };

  const handleBulkDownload = async () => {
    if (selectedFiles.size === 0) return;

    setIsDownloadingBulk(true);
    try {
      const response = await fetch("/api/files/bulk-download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileIds: Array.from(selectedFiles) }),
      });

      if (!response.ok) throw new Error("Bulk download failed");

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `files-${Date.now()}.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast.success(`Downloaded ${selectedFiles.size} file(s)`);
      clearSelection();
    } catch {
      toast.error("Failed to download files");
    } finally {
      setIsDownloadingBulk(false);
    }
  };

  const handleBulkDelete = async () => {
    if (selectedFiles.size === 0) return;

    const count = selectedFiles.size;
    const confirmed = window.confirm(
      `Are you sure you want to delete ${count} file${count !== 1 ? "s" : ""}?`
    );

    if (!confirmed) return;

    try {
      const deletePromises = Array.from(selectedFiles).map((fileId) =>
        fetch(`/api/files/${encodeURIComponent(fileId)}`, { method: "DELETE" })
      );

      await Promise.all(deletePromises);

      toast.success(`Deleted ${count} file${count !== 1 ? "s" : ""}`);
      clearSelection();
      refreshData();
    } catch {
      toast.error("Failed to delete some files");
    }
  };

  const filteredFiles = files.filter((f) =>
    f.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const filteredFolders = folders.filter((f) =>
    f.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const isLoading = filesLoading || foldersLoading;

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/20">
      <header className="border-b border-border/40 bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="relative w-8 h-8">
              <Image
                src="/icon.png"
                alt="LanDropr Logo"
                fill
                className="object-contain"
              />
            </div>
            <h1 className="text-xl font-bold tracking-tight">
              Lan<span className="text-primary">Dropr</span>
            </h1>
          </div>

          <div className="flex-1 max-w-md hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search files..."
                className="pl-9 bg-secondary/50 border-transparent focus:bg-background focus:border-primary/50 transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Dialog open={folderDialogOpen} onOpenChange={setFolderDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="gap-2 border-primary/20 hover:bg-primary/10 hover:text-primary"
                >
                  <FolderPlus className="w-4 h-4" />
                  <span className="hidden sm:inline">New Folder</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Folder</DialogTitle>
                </DialogHeader>
                <div className="flex gap-2 mt-4">
                  <Input
                    placeholder="Folder name"
                    value={newFolderName}
                    onChange={(e) => setNewFolderName(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleCreateFolder()}
                  />
                  <Button onClick={handleCreateFolder}>Create</Button>
                </div>
              </DialogContent>
            </Dialog>

            <Button
              className="gap-2 cursor-pointer shadow-lg shadow-primary/20"
              disabled={isUploading}
              onClick={() => fileInputRef.current?.click()}
            >
              {isUploading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Upload className="w-4 h-4" />
              )}
              <span className="hidden sm:inline">Upload</span>
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              className="hidden"
              onChange={(e) => handleFileUpload(e.target.files)}
              disabled={isUploading}
            />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <aside className="h-screen lg:col-span-1 order-2 lg:order-1">
            <div className="sticky top-20">
              <OnlineUsers />
            </div>
          </aside>

          <main className="lg:col-span-3 order-1 lg:order-2">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
              <nav className="flex items-center flex-wrap gap-1 text-sm bg-secondary/30 p-1 rounded-lg">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 px-3 gap-2 hover:bg-background text-muted-foreground hover:text-foreground"
                  onClick={() => setCurrentFolderId(null)}
                >
                  <Home className="w-4 h-4" />
                  <span>Home</span>
                </Button>
                {breadcrumbs.map((crumb) => (
                  <div key={crumb.id} className="flex items-center">
                    <ChevronRight className="w-4 h-4 text-muted-foreground/50" />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 px-3 hover:bg-background text-muted-foreground hover:text-foreground"
                      onClick={() => setCurrentFolderId(crumb.id)}
                    >
                      {crumb.name}
                    </Button>
                  </div>
                ))}
              </nav>

              <div className="flex items-center gap-2 bg-secondary/30 p-1 rounded-lg self-end">
                <Button
                  variant={viewMode === "grid" ? "secondary" : "ghost"}
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "secondary" : "ghost"}
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => setViewMode("list")}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {selectedFiles.size > 0 && (
              <div className="bg-primary/10 border border-primary/30 rounded-lg p-4 mb-6 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <CheckSquare className="w-5 h-5 text-primary" />
                    <span className="font-medium">
                      {selectedFiles.size} file
                      {selectedFiles.size !== 1 ? "s" : ""} selected
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearSelection}
                    className="h-8 gap-2 hover:bg-background"
                  >
                    <X className="w-4 h-4" />
                    Clear
                  </Button>
                </div>
                <div className="flex flex-col sm:flex-row w-full sm:w-auto items-stretch sm:items-center gap-2">
                  {selectedFiles.size < filteredFiles.length && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={selectAllFiles}
                      className="h-8 gap-2 border-primary/20 hover:bg-primary/10 w-full sm:w-auto"
                    >
                      <CheckSquare className="w-4 h-4" />
                      Select All
                    </Button>
                  )}
                  <Button
                    size="sm"
                    onClick={handleBulkDownload}
                    disabled={isDownloadingBulk}
                    className="h-8 gap-2 shadow-lg shadow-primary/20 w-full sm:w-auto"
                  >
                    {isDownloadingBulk ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Download className="w-4 h-4" />
                    )}
                    Download Selected
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={handleBulkDelete}
                    className="h-8 gap-2 w-full sm:w-auto"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete Selected
                  </Button>
                </div>
              </div>
            )}

            <div
              className={cn(
                "border-2 border-dashed rounded-2xl p-12 mb-10 transition-all duration-300 ease-in-out cursor-pointer",
                dragActive
                  ? "border-primary bg-primary/5 scale-[1.01] shadow-xl shadow-primary/10"
                  : "border-border/50 hover:border-primary/30 hover:bg-secondary/20"
              )}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="flex flex-col items-center text-center gap-4">
                <div
                  className={cn(
                    "p-4 rounded-full transition-colors",
                    dragActive ? "bg-primary/20" : "bg-secondary"
                  )}
                >
                  <Upload
                    className={cn(
                      "w-8 h-8 transition-colors",
                      dragActive ? "text-primary" : "text-muted-foreground"
                    )}
                  />
                </div>
                <div>
                  <p className="text-lg font-medium">
                    Drag and drop files here
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    or click to browse
                  </p>
                </div>
              </div>
            </div>

            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20 gap-4">
                <Loader2 className="w-10 h-10 animate-spin text-primary" />
                <p className="text-muted-foreground animate-pulse">
                  Loading content...
                </p>
              </div>
            ) : (
              <div className="space-y-10">
                {filteredFolders.length > 0 && (
                  <section>
                    <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4 px-1">
                      Folders
                    </h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                      {filteredFolders.map((folder) => (
                        <Card
                          key={folder.id}
                          className="group relative p-4 cursor-pointer bg-card hover:bg-secondary/50 border-border/50 hover:border-primary/30 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5"
                          onClick={() => setCurrentFolderId(folder.id)}
                        >
                          <div className="flex flex-col items-center gap-3 py-2">
                            <Folder className="w-12 h-12 text-primary fill-primary/20 transition-transform group-hover:scale-110" />
                            <span className="text-sm font-medium text-center truncate w-full">
                              {folder.name}
                            </span>
                          </div>

                          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-6 w-6"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <MoreVertical className="w-3 h-3" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                  className="text-destructive focus:text-destructive"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteFolder(folder);
                                  }}
                                >
                                  <Trash2 className="w-4 h-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </section>
                )}

                {filteredFiles.length > 0 && (
                  <section>
                    <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4 px-1">
                      Files
                    </h2>
                    {viewMode === "grid" ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {filteredFiles.map((file) => (
                          <Card
                            key={file.id}
                            className={cn(
                              "group relative p-4 bg-card hover:bg-secondary/50 border-border/50 hover:border-primary/30 transition-all duration-200 hover:shadow-md",
                              selectedFiles.has(file.id) &&
                                "border-primary bg-primary/5"
                            )}
                          >
                            <div className="flex items-start gap-3">
                              <div className="shrink-0">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-6 w-6 rounded-sm"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleFileSelection(file.id);
                                  }}
                                >
                                  {selectedFiles.has(file.id) ? (
                                    <CheckSquare className="w-4 h-4 text-primary" />
                                  ) : (
                                    <Square className="w-4 h-4" />
                                  )}
                                </Button>
                              </div>

                              <div className="flex-1 min-w-0 flex items-start justify-between gap-3">
                                <div className="flex items-center gap-3 flex-1 min-w-0">
                                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-secondary text-xl shrink-0">
                                    {getFileIcon(file.name)}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p
                                      className="font-medium truncate text-sm"
                                      title={file.originalName}
                                    >
                                      {file.originalName}
                                    </p>
                                    <p className="text-xs text-muted-foreground mt-1">
                                      {formatBytes(file.size)}
                                    </p>
                                  </div>
                                </div>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-6 w-6"
                                    >
                                      <MoreVertical className="w-4 h-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem
                                      onClick={() => handleDownload(file)}
                                      className="gap-2"
                                    >
                                      <Download className="w-4 h-4" />
                                      Download
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      onClick={() => handleDeleteFile(file)}
                                      className="gap-2 text-destructive focus:text-destructive"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                      Delete
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </div>
                            <div className="mt-3 pt-3 border-t border-border/50 text-xs text-muted-foreground">
                              <span>
                                {new Date(file.createdAt).toLocaleString()}
                              </span>
                            </div>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {filteredFiles.map((file) => (
                          <Card
                            key={file.id}
                            className={cn(
                              "group flex items-center gap-4 p-3 hover:bg-secondary/50 border-border/50 transition-colors",
                              selectedFiles.has(file.id) &&
                                "border-primary bg-primary/5"
                            )}
                          >
                            <div className="shrink-0">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 rounded-sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleFileSelection(file.id);
                                }}
                              >
                                {selectedFiles.has(file.id) ? (
                                  <CheckSquare className="w-4 h-4 text-primary" />
                                ) : (
                                  <Square className="w-4 h-4" />
                                )}
                              </Button>
                            </div>

                            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-secondary text-lg shrink-0">
                              {getFileIcon(file.type)}
                            </div>
                            <div className="flex-1 min-w-0 grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                              <div className="md:col-span-2">
                                <p className="font-medium truncate text-sm">
                                  {file.originalName}
                                </p>
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {new Date(file.createdAt).toLocaleString()}
                              </div>
                            </div>
                            <div className="flex items-center gap-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => handleDownload(file)}
                              >
                                <Download className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-destructive hover:text-destructive"
                                onClick={() => handleDeleteFile(file)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </Card>
                        ))}
                      </div>
                    )}
                  </section>
                )}

                {filteredFolders.length === 0 && filteredFiles.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="w-20 h-20 rounded-full bg-secondary/50 flex items-center justify-center mb-6">
                      <Folder className="w-10 h-10 text-muted-foreground/50" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      No files found
                    </h3>
                    <p className="text-muted-foreground max-w-sm mx-auto">
                      {searchQuery
                        ? "No files or folders match your search query."
                        : "This folder is empty. Upload files or create a new folder to get started."}
                    </p>
                    {!searchQuery && (
                      <Button
                        className="mt-6 gap-2"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <Upload className="w-4 h-4" />
                        Upload Files
                      </Button>
                    )}
                  </div>
                )}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
