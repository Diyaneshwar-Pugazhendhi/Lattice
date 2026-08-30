"use client";

import { useEffect, useRef, useState, useCallback } from "react";

export interface SocketEvent {
  type: "task_created" | "task_updated" | "task_deleted" | "task_moved" | "connect" | "disconnect";
  payload: any;
}

export function useSocket(url: string) {
  const [socket, setSocket] = useState<InstanceType<typeof import("socket.io-client")> | null>(null);
  const [connected, setConnected] = useState(false);
  const socketRef = useRef<InstanceType<typeof import("socket.io-client")> | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const io = require("socket.io-client");
    const socketInstance = io(url, {
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    socketInstance.on("connect", () => setConnected(true));
    socketInstance.on("disconnect", () => setConnected(false));

    socketRef.current = socketInstance;
    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, [url]);

  const emit = useCallback((event: string, data?: any) => {
    socketRef.current?.emit(event, data);
  }, []);

  const on = useCallback((event: string, callback: (data: any) => void) => {
    socketRef.current?.on(event, callback);
  }, []);

  const off = useCallback((event: string, callback?: (...args: any[]) => void) => {
    socketRef.current?.off(event, callback);
  }, []);

  return { socket, connected, emit, on, off };
}