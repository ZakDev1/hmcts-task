import { useState } from "react";
import { createTask } from "../api/tasks";
import { CreateTaskSchema } from "../schemas/task.schema";
import { ZodError } from "zod";

interface CreateTaskFormProps {
  onCreated: () => void;
}

export const CreateTaskForm = ({ onCreated }: CreateTaskFormProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setErrors({});

    try {
      const input = CreateTaskSchema.parse({
        title,
        description: description || undefined,
        status: "PENDING",
        dueDate: dueDate ? new Date(dueDate).toISOString() : "",
      });

      setSubmitting(true);
      await createTask(input);
      setTitle("");
      setDescription("");
      setDueDate("");
      onCreated();
    } catch (err) {
      if (err instanceof ZodError) {
        const fieldErrors: Record<string, string> = {};
        err.issues.forEach((issue) => {
          const field = issue.path[0]?.toString() ?? "unknown";
          fieldErrors[field] = issue.message;
        });
        setErrors(fieldErrors);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="govuk-form-group">
      <h2 className="govuk-heading-m">Create a new task</h2>

      <div className={`govuk-form-group ${errors["title"] ? "govuk-form-group--error" : ""}`}>
        <label className="govuk-label" htmlFor="title">
          Title <span className="govuk-visually-hidden">(required)</span>
        </label>
        {errors["title"] && (
          <p className="govuk-error-message">
            <span className="govuk-visually-hidden">Error:</span> {errors["title"]}
          </p>
        )}
        <input
          className={`govuk-input ${errors["title"] ? "govuk-input--error" : ""}`}
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="govuk-form-group">
        <label className="govuk-label" htmlFor="description">
          Description <span className="govuk-hint">(optional)</span>
        </label>
        <textarea
          className="govuk-textarea"
          id="description"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className={`govuk-form-group ${errors["dueDate"] ? "govuk-form-group--error" : ""}`}>
        <label className="govuk-label" htmlFor="dueDate">
          Due date and time <span className="govuk-visually-hidden">(required)</span>
        </label>
        {errors["dueDate"] && (
          <p className="govuk-error-message">
            <span className="govuk-visually-hidden">Error:</span> {errors["dueDate"]}
          </p>
        )}
        <input
          className={`govuk-input govuk-input--width-20 ${errors["dueDate"] ? "govuk-input--error" : ""}`}
          id="dueDate"
          type="datetime-local"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>

      <button className="govuk-button" disabled={submitting} onClick={handleSubmit}>
        {submitting ? "Creating..." : "Create task"}
      </button>
    </div>
  );
};
