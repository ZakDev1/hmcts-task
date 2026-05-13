import { test, expect, request } from "@playwright/test";

test.describe("Task Manager", () => {
  test.beforeEach(async ({ page }) => {
    // Clear all tasks before each test
    const context = await request.newContext();
    const tasks = await context.get("http://localhost:3000/api/tasks");
    const data = (await tasks.json()) as Array<{ id: string }>;
    for (const task of data) {
      await context.delete(`http://localhost:3000/api/tasks/${task.id}`);
    }
    await context.dispose();

    await page.goto("/");
    await page.waitForLoadState("networkidle");
  });

  test("should display the page header", async ({ page }) => {
    await expect(page.getByText("HMCTS Task Manager")).toBeVisible();
    await expect(page.getByText("Caseworker Tasks")).toBeVisible();
  });

  test("should show empty state when no tasks exist", async ({ page }) => {
    await expect(page.getByText("No tasks found. Create one above to get started.")).toBeVisible();
  });

  test("should show validation errors when submitting empty form", async ({ page }) => {
    await page.getByRole("button", { name: "Create task" }).click();
    await expect(page.getByText("Title is required")).toBeVisible();
  });

  test("should create a task and display it in the list", async ({ page }) => {
    await page.getByLabel("Title").fill("Test Playwright Task");
    await page.getByLabel("Description").fill("Created by Playwright");
    await page.getByLabel("Due date and time").fill("2026-06-01T10:00");

    await Promise.all([
      page.waitForResponse((res) => res.url().includes("/api/tasks") && res.status() === 201),
      page.getByRole("button", { name: "Create task" }).click(),
    ]);

    await expect(page.getByRole("heading", { name: "Test Playwright Task" })).toBeVisible();
    await expect(page.getByText("Created by Playwright")).toBeVisible();
    await expect(page.locator(".govuk-tag").getByText("Pending")).toBeVisible();
  });

  test("should update a task status", async ({ page }) => {
    await page.getByLabel("Title").fill("Status Update Task");
    await page.getByLabel("Due date and time").fill("2026-06-01T10:00");

    await Promise.all([
      page.waitForResponse((res) => res.url().includes("/api/tasks") && res.status() === 201),
      page.getByRole("button", { name: "Create task" }).click(),
    ]);

    await expect(page.getByRole("heading", { name: "Status Update Task" })).toBeVisible();

    await Promise.all([
      page.waitForResponse((res) => res.url().includes("/status")),
      page.getByRole("combobox").first().selectOption("IN_PROGRESS"),
    ]);

    await expect(page.locator(".govuk-tag").getByText("In Progress")).toBeVisible();
  });

  test("should delete a task", async ({ page }) => {
    await page.getByLabel("Title").fill("Task To Delete");
    await page.getByLabel("Due date and time").fill("2026-06-01T10:00");

    await Promise.all([
      page.waitForResponse((res) => res.url().includes("/api/tasks") && res.status() === 201),
      page.getByRole("button", { name: "Create task" }).click(),
    ]);

    await expect(page.getByRole("heading", { name: "Task To Delete" })).toBeVisible();

    page.on("dialog", (dialog) => dialog.accept());

    await Promise.all([
      page.waitForResponse((res) => res.url().includes("/api/tasks") && res.status() === 204),
      page.getByRole("button", { name: "Delete task" }).first().click(),
    ]);

    await expect(page.getByRole("heading", { name: "Task To Delete" })).not.toBeVisible();
  });
});
