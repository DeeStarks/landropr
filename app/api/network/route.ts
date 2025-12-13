import { NextResponse } from "next/server";
import os from "os";

export async function GET() {
  const port = process.env.PORT || 3000;
  try {
    const interfaces = os.networkInterfaces();
    let networkAddress = "localhost:" + port;

    for (const name of Object.keys(interfaces)) {
      const iface = interfaces[name];
      if (!iface) continue;

      for (const alias of iface) {
        if (alias.family === "IPv4" && !alias.internal) {
          networkAddress = `${alias.address}:${port}`;
          break;
        }
      }
      if (networkAddress !== "localhost:" + port) break;
    }

    const url = `http://${networkAddress}`;

    return NextResponse.json({ url, address: networkAddress });
  } catch (error) {
    console.error("Error getting network address:", error);
    return NextResponse.json(
      { url: "http://localhost:" + port, address: "localhost:" + port },
      { status: 500 }
    );
  }
}
