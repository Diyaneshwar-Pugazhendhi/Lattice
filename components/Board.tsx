"use client";

import { useState } from "react";
import { TaskColumn } from "./TaskColumn";
import { CreateTaskModal } from "./CreateTaskModal";
import { useTasks, type Task } from "@/hooks/useTasks";
import { useSocket } from "@/hooks/useSocket";
import { ConnectionStatus } from "./ConnectionStatus";
import { Loader2 } from "lucide-react";

const COLUMNS = [
  { id: "todo", title: "To Do", color: "bg-slate-500" },
  { id: "in-progress", title: "In Progress", color: "bg-blue-500" },
  { id: "done", title: "Done", color: "bg-green-500" },
];

export function Board() {
  const { tasks, loading, error, connected, createTask, deleteTask, moveTask } =
    useTasks();
  const [draggingTask, setDraggingTask] = useState<Task | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeColumn, setActiveColumn] = useState("todo");

  const handleDragStart = (e: React.DragEvent, task: Task) => {
    setDraggingTask(task);
    e.dataTransfer.setData("text/plain", task.id);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragEnd = () => {
    setDraggingTask(null);
  };

  const handleDrop = async (column: string) => {
    if (!draggingTask || draggingTask.columnId === column) return;
    await moveTask(draggingTask.id, column, 0);
    setDraggingTask(null);
  };

  const handleAddTask = (columnId: string) => {
    setActiveColumn(columnId);
    setModalOpen(true);
  };

  const handleCreateTask = async (data: {
    title: string;
    description: string;
    priority: string;
    status: string;
    columnId: string;
    orderIndex: number;
  }) => {
    await createTask(data);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-destructive p-8">
        <p>Error loading tasks: {error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Your Board</h2>
          <p className="text-sm text-muted-foreground">
            Drag tasks between columns. Changes sync in real-time.
          </p>
        </div>
        <ConnectionStatus connected={connected} />
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4">
        {COLUMNS.map((col) => (
          <TaskColumn
            key={col.id}
            title={col.title}
            columnId={col.id}
            color={col.color}
            tasks={tasks.filter((t) => t.columnId === col.id)}
            onDrop={handleDrop}
            onDelete={deleteTask}
            onAddTask={handleAddTask}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            draggingTaskId={draggingTask?.id ?? null}
          />
        ))}
      </div>

      <CreateTaskModal
        isOpen={modalOpen}
        columnId={activeColumn}
        onClose={() => setModalOpen(false)}
        onCreate={handleCreateTask}
      />
    </div>
  );
}