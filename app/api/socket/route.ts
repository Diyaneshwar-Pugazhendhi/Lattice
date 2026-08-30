import { Server as SocketServer } from "socket.io";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// In-memory Socket.io server instance (single connection per process)
let io: SocketServer | null = null;

function initSocketServer() {
  if (io) return io;

  const httpServer = (global as any).httpServer;
  if (!httpServer) {
    console.warn("HTTP server not available; Socket.io requires a custom server.");
    return null;
  }

  io = new SocketServer(httpServer, {
    path: "/api/socket",
    cors: {
      origin: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });

  return io;
}

export async function GET(req: NextRequest) {
  const result = initSocketServer();
  if (!result) {
    return NextResponse.json(
      {
        message: "Socket.io requires a custom server. See README.md for setup instructions.",
      },
      { status: 200 }
    );
  }
  return NextResponse.json({ status: "ok" });
}

export async function POST(req: NextRequest) {
  // Optional: accept a broadcast payload and forward to all clients
  try {
    const body = await req.json();
    const socketInstance = initSocketServer();
    if (socketInstance) {
      socketInstance.emit("broadcast", body);
    }
    return NextResponse.json({ status: "broadcast sent" });
  } catch (err) {
    return NextResponse.json({ status: "ok" });
  }
}