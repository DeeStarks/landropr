import { Server as HTTPServer } from "http";
import { Server as SocketIOServer } from "socket.io";

export interface User {
  id: string;
  name: string;
  ip: string;
  connectedAt: Date;
}

const users = new Map<string, User>();

export function setupWebSocket(httpServer: HTTPServer) {
  const io = new SocketIOServer(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    const ip = socket.handshake.address;

    socket.on("register", (userName: string) => {
      const user: User = {
        id: socket.id,
        name: userName || `User-${socket.id.slice(0, 4)}`,
        ip,
        connectedAt: new Date(),
      };

      users.set(socket.id, user);
      io.emit("user-joined", user);
      socket.emit("users-list", Array.from(users.values()));
      console.log(`User registered: ${user.name} (${socket.id})`);
    });
    socket.on("file-uploaded", (fileData) => {
      socket.broadcast.emit("file-added", fileData);
    });
    socket.on("file-deleted", (fileId) => {
      socket.broadcast.emit("file-removed", fileId);
    });
    socket.on("folder-created", (folderData) => {
      socket.broadcast.emit("folder-added", folderData);
    });
    socket.on("folder-deleted", (folderId) => {
      socket.broadcast.emit("folder-removed", folderId);
    });
    socket.on("disconnect", () => {
      const user = users.get(socket.id);
      if (user) {
        users.delete(socket.id);
        io.emit("user-left", user);
        console.log(`User disconnected: ${user.name} (${socket.id})`);
      }
    });
  });

  return io;
}

export function getOnlineUsers() {
  return Array.from(users.values());
}
