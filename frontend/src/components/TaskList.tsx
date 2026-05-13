import { useEffect, useState } from "react";
import { getAllTasks } from "../api/tasks";
import type { Task } from "../types/task";
import { TaskCard } from "./TaskCard";

interface TaskListProps {
  refresh: number;
  onRefresh: () => void;
}

export const TaskList = ({ refresh, onRefresh }: TaskListProps) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const data = await getAllTasks();
        setTasks(data);
      } catch {
        setError("Failed to load tasks. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    void fetchTasks();
  }, [refresh]);

  if (loading) {
    return (
      <div className="govuk-body">
        <p>Loading tasks...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="govuk-error-summary">
        <h2 className="govuk-error-summary__title">There was a problem</h2>
        <div className="govuk-error-summary__body">
          <p className="govuk-body">{error}</p>
        </div>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="govuk-inset-text">
        <p className="govuk-body">No tasks found. Create one above to get started.</p>
      </div>
    );
  }

  return (
    <div>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} onUpdate={onRefresh} />
      ))}
    </div>
  );
};
