import { test, expect } from "@playwright/test";

test.skip("Todos Page | edit todo e2e", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Todos" }).click();
  await expect(page.getByRole("heading", { name: "Todos" })).toBeVisible();

  const createdTitle = `Todo e2e edit ${Date.now()}`;
  const updatedTitle = `${createdTitle} updated`;

  await page.getByLabel("Title *").fill(createdTitle);
  await page.getByLabel("Due Date *").fill("2030-12-31T10:00");
  await page.getByLabel("Priority *").selectOption("Low");
  await page.getByRole("button", { name: "Create new todo" }).click();

  await expect(page.getByRole("link", { name: createdTitle })).toBeVisible({
    timeout: 15_000,
  });

  await page.getByRole("link", { name: createdTitle }).click();

  await expect(page.getByRole("button", { name: "Edit" })).toBeVisible();
  await page.getByRole("button", { name: "Edit" }).click();

  await page.getByLabel("Title *").fill(updatedTitle);
  await page.getByLabel("Due Date *").fill("2031-01-01T11:00");
  await page.getByLabel("Priority *").selectOption("High");

  const saveButton = page
    .locator("form button[type='submit']")
    .filter({ hasText: /save|update/i })
    .first();

  await saveButton.click();

  await expect(page.getByText(updatedTitle)).toBeVisible({ timeout: 15_000 });

  await page.getByRole("link", { name: "← Back to todos" }).click();

  await expect(page.getByRole("link", { name: updatedTitle })).toBeVisible({
    timeout: 15_000,
  });
});

test("Todos Page | optimistic toggle updates on successful save", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Todos" }).click();
  await expect(page.getByRole("heading", { name: "Todos" })).toBeVisible();

  const createdTitle = `Todo e2e toggle fail ${Date.now()}`;

  await page.getByLabel("Title *").fill(createdTitle);
  await page.getByLabel("Due Date *").fill("2030-12-31T10:00");
  await page.getByLabel("Priority *").selectOption("Low");
  await page.getByRole("button", { name: "Create new todo" }).click();

  await expect(page.getByRole("link", { name: createdTitle })).toBeVisible({
    timeout: 15_000,
  });

  const createdTodoCard = page
    .locator("section > div")
    .filter({ has: page.getByRole("link", { name: createdTitle }) })
    .first();
  const completeCheckbox = createdTodoCard.getByRole("checkbox").first();

  const initialState = await completeCheckbox.getAttribute("data-state");
  const expectedState = initialState === "checked" ? "unchecked" : "checked";

  await completeCheckbox.click();

  await expect(completeCheckbox).toHaveAttribute("data-state", expectedState);
});
