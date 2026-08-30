"use client";

import { useState } from "react";
import { Button } from "./Button";
import type { Task } from "@/hooks/useTasks";
import { formatDate } from "@/lib/utils";
import { Trash2, GripVertical } from "lucide-react";

const priorityColors: Record<string, string> = {
  low: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  medium: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300",
  high: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
};

export function TaskCard({
  task,
  onDelete,
  onDragStart,
  onDragEnd,
  isDragging,
}: {
  task: Task;
  onDelete: (id: string) => void;
  onDragStart: (e: React.DragEvent, task: Task) => void;
  onDragEnd: () => void;
  isDragging: boolean;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, task)}
      onDragEnd={onDragEnd}
      className={`
        group relative rounded-lg border bg-card p-3 shadow-sm transition-all
        hover:shadow-md cursor-grab active:cursor-grabbing
        ${isDragging ? "opacity-50 rotate-2" : ""}
      `}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-start gap-2 flex-1 min-w-0">
          <GripVertical className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity mt-0.5 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-sm leading-tight truncate">
              {task.title}
            </h3>
            {task.description && (
              <p
                className={`text-xs text-muted-foreground mt-1 ${
                  isExpanded ? "" : "line-clamp-2"
                }`}
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {task.description}
              </p>
            )}
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onDelete(task.id)}
          className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
          aria-label="Delete task"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </Button>
      </div>

      <div className="flex items-center justify-between mt-2 gap-2">
        <span
          className={`text-xs px-2 py-0.5 rounded-full font-medium ${
            priorityColors[task.priority] || priorityColors.medium
          }`}
        >
          {task.priority}
        </span>
        <span className="text-xs text-muted-foreground">
          {formatDate(task.createdAt)}
        </span>
      </div>
    </div>
  );
}