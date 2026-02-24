import { test, expect } from "@playwright/test";

test("Todos Page | e2e", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Todos" }).click();
  await expect(page.getByText("Todos")).toBeVisible();
});
