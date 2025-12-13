"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { QrCode, Copy, Check } from "lucide-react";
import { toast } from "sonner";
import QRCode from "qrcode";

export function NetworkQRCode() {
  const [open, setOpen] = useState(false);
  const [networkUrl, setNetworkUrl] = useState("");
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function fetchNetworkUrl() {
      try {
        const response = await fetch("/api/network");
        const data = await response.json();
        setNetworkUrl(data.url);

        const qr = await QRCode.toDataURL(data.url, {
          width: 300,
          margin: 2,
          color: {
            dark: "#FCD66F",
            light: "#0a0a0a",
          },
        });
        setQrCodeUrl(qr);
      } catch (error) {
        console.error("Error fetching network URL:", error);
      }
    }

    if (open) {
      fetchNetworkUrl();
    }
  }, [open]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(networkUrl);
      setCopied(true);
      toast.success("URL copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy URL");
    }
  };

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        size="icon"
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg shadow-primary/20 z-50"
        title="Show Network QR Code"
      >
        <QrCode className="w-6 h-6" />
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Share on Network</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center gap-6 py-4">
            {qrCodeUrl && (
              <div className="p-4 bg-background rounded-lg border border-border">
                <img src={qrCodeUrl} alt="QR Code" className="w-full h-auto" />
              </div>
            )}
            <div className="w-full space-y-2">
              <p className="text-sm text-muted-foreground text-center">
                Scan this QR code or use the URL below to access from other
                devices on your network
              </p>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={networkUrl}
                  readOnly
                  className="flex-1 px-3 py-2 text-sm bg-secondary rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <Button
                  size="icon"
                  variant="outline"
                  onClick={copyToClipboard}
                  className="shrink-0"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
