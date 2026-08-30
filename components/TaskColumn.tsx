"use client";

import { useState } from "react";
import { TaskCard } from "./TaskCard";
import { Button } from "./Button";
import type { Task } from "@/hooks/useTasks";
import { Plus } from "lucide-react";

export function TaskColumn({
  title,
  columnId,
  tasks,
  onDrop,
  onDelete,
  onAddTask,
  onDragStart,
  onDragEnd,
  draggingTaskId,
  color,
}: {
  title: string;
  columnId: string;
  tasks: Task[];
  onDrop: (column: string) => void;
  onDelete: (id: string) => void;
  onAddTask: (columnId: string) => void;
  onDragStart: (e: React.DragEvent, task: Task) => void;
  onDragEnd: () => void;
  draggingTaskId: string | null;
  color: string;
}) {
  const [isOver, setIsOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsOver(true);
  };

  const handleDragLeave = () => {
    setIsOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsOver(false);
    onDrop(columnId);
  };

  return (
    <div className="flex flex-col h-full min-w-[280px] w-[280px]">
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2">
          <div className={`h-2 w-2 rounded-full ${color}`} />
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            {title}
          </h2>
          <span className="text-xs bg-secondary px-2 py-0.5 rounded-full">
            {tasks.length}
          </span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onAddTask(columnId)}
          className="h-7 w-7"
          aria-label={`Add task to ${title}`}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          flex-1 rounded-lg p-2 space-y-2 transition-colors min-h-[400px]
          ${isOver ? "bg-accent/50 ring-2 ring-primary/20" : "bg-secondary/30"}
        `}
      >
        {tasks.length === 0 ? (
          <div className="flex items-center justify-center h-32 text-xs text-muted-foreground border-2 border-dashed border-border rounded-md">
            Drop tasks here
          </div>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onDelete={onDelete}
              onDragStart={onDragStart}
              onDragEnd={onDragEnd}
              isDragging={task.id === draggingTaskId}
            />
          ))
        )}
      </div>
    </div>
  );
}