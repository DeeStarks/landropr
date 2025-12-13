"use client";

import { Users, Wifi, WifiOff } from "lucide-react";
import { Card } from "@/components/ui/card";
import { usePresence } from "@/hooks/use-presence";

export function OnlineUsers() {
  const { users, isConnected } = usePresence();

  return (
    <Card className="p-4 bg-card border-border/50">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-primary" />
          <h3 className="font-semibold">Online Users</h3>
        </div>
        <div className="flex items-center gap-2">
          {isConnected ? (
            <>
              <Wifi className="w-4 h-4 text-green-500" />
              <span className="text-xs text-green-500">Connected</span>
            </>
          ) : (
            <>
              <WifiOff className="w-4 h-4 text-destructive" />
              <span className="text-xs text-destructive">Disconnected</span>
            </>
          )}
        </div>
      </div>

      <div className="space-y-2">
        {users.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">
            No other users online
          </p>
        ) : (
          users.map((user) => (
            <div
              key={user.id}
              className="flex items-center gap-3 p-2 rounded-md bg-secondary/30 hover:bg-secondary/50 transition-colors"
            >
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user.name}</p>
                <p className="text-xs text-muted-foreground">{user.ip}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {users.length > 0 && (
        <div className="mt-3 pt-3 border-t border-border/50 text-xs text-muted-foreground text-center">
          {users.length} {users.length === 1 ? "user" : "users"} online
        </div>
      )}
    </Card>
  );
}
