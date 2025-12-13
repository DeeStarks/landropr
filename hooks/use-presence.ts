"use client";

import { useEffect, useState, useCallback } from "react";
import { io, Socket } from "socket.io-client";

export interface User {
  id: string;
  name: string;
  ip: string;
  connectedAt: Date;
}

let socket: Socket | null = null;

export function usePresence(userName?: string) {
  const [users, setUsers] = useState<User[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  const notifyFileUpload = useCallback((fileData: any) => {
    socket?.emit("file-uploaded", fileData);
  }, []);

  const notifyFileDelete = useCallback((fileId: string) => {
    socket?.emit("file-deleted", fileId);
  }, []);

  const notifyFolderCreate = useCallback((folderData: any) => {
    socket?.emit("folder-created", folderData);
  }, []);

  const notifyFolderDelete = useCallback((folderId: string) => {
    socket?.emit("folder-deleted", folderId);
  }, []);

  useEffect(() => {
    if (!socket) {
      socket = io({
        path: "/socket.io",
      });
    }

    function onConnect() {
      setIsConnected(true);
      socket?.emit("register", userName || `User-${Date.now()}`);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onUsersList(usersList: User[]) {
      setUsers(usersList);
    }

    function onUserJoined(user: User) {
      setUsers((prev) => [...prev, user]);
    }

    function onUserLeft(user: User) {
      setUsers((prev) => prev.filter((u) => u.id !== user.id));
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("users-list", onUsersList);
    socket.on("user-joined", onUserJoined);
    socket.on("user-left", onUserLeft);

    return () => {
      socket?.off("connect", onConnect);
      socket?.off("disconnect", onDisconnect);
      socket?.off("users-list", onUsersList);
      socket?.off("user-joined", onUserJoined);
      socket?.off("user-left", onUserLeft);
    };
  }, [userName]);

  return {
    users,
    isConnected,
    notifyFileUpload,
    notifyFileDelete,
    notifyFolderCreate,
    notifyFolderDelete,
    socket,
  };
}
