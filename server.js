// Custom Next.js server with Socket.io integration
// Usage: node server.js (after building) or npm run dev
const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");
const { Server: SocketServer } = require("socket.io");

const dev = process.env.NODE_ENV !== "production";
const hostname = process.env.HOSTNAME || "localhost";
const port = parseInt(process.env.PORT || "3000", 10);

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });

  // Initialize Socket.io
  const io = new SocketServer(httpServer, {
    path: "/api/socket",
    cors: {
      origin: process.env.NEXT_PUBLIC_APP_URL || `http://localhost:${port}`,
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  // Make io accessible to API routes via global
  globalThis.io = io;

  io.on("connection", (socket) => {
    console.log(`✅ Client connected: ${socket.id}`);

    socket.on("join_board", (boardId) => {
      socket.join(boardId);
      console.log(`Socket ${socket.id} joined board ${boardId}`);
    });

    socket.on("task_created", (task) => {
      socket.broadcast.emit("task_created", task);
    });

    socket.on("task_updated", (task) => {
      socket.broadcast.emit("task_updated", task);
    });

    socket.on("task_deleted", ({ id }) => {
      socket.broadcast.emit("task_deleted", { id });
    });

    socket.on("task_moved", (task) => {
      socket.broadcast.emit("task_moved", task);
    });

    socket.on("disconnect", () => {
      console.log(`❌ Client disconnected: ${socket.id}`);
    });
  });

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
      console.log(`> Socket.io running on path /api/socket`);
    });
});