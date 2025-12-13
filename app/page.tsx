import { FileExplorer } from "@/components/file-explorer";
import { NetworkQRCode } from "@/components/network-qr-code";

export default function Home() {
  return (
    <>
      <FileExplorer />
      <NetworkQRCode />
    </>
  );
}
