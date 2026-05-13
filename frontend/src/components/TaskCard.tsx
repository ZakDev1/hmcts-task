import type { Task, TaskStatus } from "../types/task";
import { updateTaskStatus, deleteTask } from "../api/tasks";

interface TaskCardProps {
  task: Task;
  onUpdate: () => void;
}

const statusTagClass: Record<TaskStatus, string> = {
  PENDING: "govuk-tag govuk-tag--yellow",
  IN_PROGRESS: "govuk-tag govuk-tag--blue",
  COMPLETED: "govuk-tag govuk-tag--green",
};

const statusLabels: Record<TaskStatus, string> = {
  PENDING: "Pending",
  IN_PROGRESS: "In Progress",
  COMPLETED: "Completed",
};

export const TaskCard = ({ task, onUpdate }: TaskCardProps) => {
  const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    await updateTaskStatus(task.id, { status: e.target.value as TaskStatus });
    onUpdate();
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      await deleteTask(task.id);
      onUpdate();
    }
  };

  return (
    <div className="govuk-summary-card" style={{ marginBottom: "1rem" }}>
      <div className="govuk-summary-card__title-wrapper">
        <h3 className="govuk-summary-card__title">{task.title}</h3>
        <span className={statusTagClass[task.status]}>{statusLabels[task.status]}</span>
      </div>
      <div className="govuk-summary-card__content">
        <dl className="govuk-summary-list">
          {task.description && (
            <div className="govuk-summary-list__row">
              <dt className="govuk-summary-list__key">Description</dt>
              <dd className="govuk-summary-list__value">{task.description}</dd>
            </div>
          )}
          <div className="govuk-summary-list__row">
            <dt className="govuk-summary-list__key">Due date</dt>
            <dd className="govuk-summary-list__value">
              {new Date(task.dueDate).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </dd>
          </div>
          <div className="govuk-summary-list__row">
            <dt className="govuk-summary-list__key">Update status</dt>
            <dd className="govuk-summary-list__value">
              <select className="govuk-select" value={task.status} onChange={handleStatusChange}>
                <option value="PENDING">Pending</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="COMPLETED">Completed</option>
              </select>
            </dd>
          </div>
        </dl>
        <button className="govuk-button govuk-button--warning" onClick={handleDelete}>
          Delete task
        </button>
      </div>
    </div>
  );
};
