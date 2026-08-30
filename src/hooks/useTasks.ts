"use client";

import { useState, useEffect, useCallback } from "react";
import { useSocket } from "./useSocket";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  columnId: string;
  orderIndex: number;
  authorId: string;
  assigneeId: string | null;
  createdAt: string;
  updatedAt: string;
}

const API_URL = "/api/tasks";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { connected, emit, on } = useSocket("/api/socket");

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Failed to fetch tasks");
      const data = await res.json();
      setTasks(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  useEffect(() => {
    const handleTaskCreated = (task: Task) => {
      setTasks((prev) => [...prev, task]);
    };
    const handleTaskUpdated = (updatedTask: Task) => {
      setTasks((prev) =>
        prev.map((t) => (t.id === updatedTask.id ? updatedTask : t))
      );
    };
    const handleTaskDeleted = ({ id }: { id: string }) => {
      setTasks((prev) => prev.filter((t) => t.id !== id));
    };
    const handleTaskMoved = (movedTask: Task) => {
      setTasks((prev) =>
        prev.map((t) => (t.id === movedTask.id ? movedTask : t))
      );
    };

    on("task_created", handleTaskCreated);
    on("task_updated", handleTaskUpdated);
    on("task_deleted", handleTaskDeleted);
    on("task_moved", handleTaskMoved);

    return () => {
      off("task_created");
      off("task_updated");
      off("task_deleted");
      off("task_moved");
    };
  }, [on, off]);

  const createTask = useCallback(
    async (task: Omit<Task, "id" | "createdAt" | "updatedAt">) => {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
      });
      return await res.json();
    },
    []
  );

  const updateTask = useCallback(async (id: string, updates: Partial<Task>) => {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });
    return await res.json();
  }, []);

  const deleteTask = useCallback(async (id: string) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const moveTask = useCallback(
    async (id: string, newColumn: string, newOrder: number) => {
      const res = await fetch(`${API_URL}/${id}/move`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ column: newColumn, orderIndex: newOrder }),
      });
      return await res.json();
    },
    []
  );

  return {
    tasks,
    loading,
    error,
    connected,
    createTask,
    updateTask,
    deleteTask,
    moveTask,
    refresh: fetchTasks,
  };
}