import { expect, test } from "@playwright/test";

test("homepage renders and carousel advances", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: /ideas in another dimension/i })).toBeVisible();
  await expect(page.getByLabel("Project 1 of 5")).toBeVisible();
  await page.getByRole("button", { name: "Next project" }).click();
  await expect(page.getByLabel("Project 2 of 5")).toBeVisible();

  await page.getByRole("link", { name: "Blog", exact: true }).click();
  await expect(page).toHaveURL(/\/blog$/);
  await expect(page.getByRole("heading", { name: /a fresh take on what's next/i })).toBeVisible();
});

test("mobile navigation opens and routes to sign in", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  await page.getByRole("button", { name: "Open navigation menu" }).click();
  await expect(page.getByRole("navigation", { name: "Mobile navigation" })).toBeVisible();
  await page.getByRole("navigation", { name: "Mobile navigation" }).getByRole("link", { name: "Login" }).click();

  await expect(page).toHaveURL(/\/dashboard\/login$/);
  await expect(page.getByRole("heading", { name: "Welcome back" })).toBeVisible();
});

test("dashboard edits and persists content and supports project CRUD", async ({ page }) => {
  await page.goto("/dashboard");
  await expect(page.getByRole("heading", { name: "Homepage dashboard" })).toBeVisible();

  const brandName = page.getByRole("textbox", { name: "Brand name" });
  await brandName.fill("FORME TEST");
  await page.reload();
  await expect(page.getByRole("textbox", { name: "Brand name" })).toHaveValue("FORME TEST");

  await page.getByRole("button", { name: "+ Add project" }).click();
  await page.getByRole("textbox", { name: "Project name" }).fill("Test project");
  await page.getByRole("textbox", { name: "Category / year" }).fill("Testing · 2026");
  await page.getByLabel("Artwork style").selectOption("daydream");
  await page.getByRole("button", { name: "Save project" }).click();

  const project = page.getByRole("listitem").filter({ hasText: "Test project" });
  await expect(project).toContainText("Testing · 2026");
  await expect(project).toContainText("Daydream");

  await project.getByRole("button", { name: "Edit" }).click();
  await page.getByRole("textbox", { name: "Project name" }).fill("Updated project");
  await page.getByRole("button", { name: "Save project" }).click();
  await expect(page.getByRole("listitem").filter({ hasText: "Updated project" })).toBeVisible();

  page.once("dialog", (dialog) => dialog.accept());
  await page.getByRole("listitem").filter({ hasText: "Updated project" }).getByRole("button", { name: "Delete" }).click();
  await expect(page.getByRole("listitem").filter({ hasText: "Updated project" })).toHaveCount(0);
});

test("dashboard reports invalid saved content without replacing it", async ({ page }) => {
  await page.goto("/dashboard");
  await page.evaluate(() => localStorage.setItem("forme-homepage-content", "{}"));
  await page.reload();

  await expect(page.locator('p[role="alert"]')).toContainText("Saved homepage content is invalid");
  await expect(page.getByRole("textbox", { name: "Brand name" })).toHaveValue("FORME");
});

test("login creates a session and logout clears it", async ({ page }) => {
  await page.goto("/dashboard/login");
  await page.getByRole("textbox", { name: "Email" }).fill("test@example.com");
  await page.getByLabel("Password").fill("test-password");
  await page.getByRole("button", { name: "Sign in" }).click();

  await expect(page).toHaveURL(/\/dashboard$/);
  await expect(page.getByRole("heading", { name: "Homepage dashboard" })).toBeVisible();
  await expect(page.evaluate(() => localStorage.getItem("forme-auth-session"))).resolves.toBe("active");

  await page.goto("/dashboard/logout");
  await page.getByRole("button", { name: "Log out" }).click();
  await expect(page).toHaveURL(/\/dashboard\/login$/);
  await expect(page.getByRole("heading", { name: "Welcome back" })).toBeVisible();
  await expect(page.evaluate(() => localStorage.getItem("forme-auth-session"))).resolves.toBeNull();
});

test("blog filters and searches stories, previews one, and accepts newsletter signup", async ({ page }) => {
  await page.goto("/blog");

  const storyCards = page.locator(".blog-story-card");
  await expect(storyCards).toHaveCount(6);

  const filters = page.locator('[aria-label="Filter stories"]');
  await filters.getByRole("button", { name: "Culture" }).click();
  await expect(storyCards).toHaveCount(2);
  await expect(filters.getByRole("button", { name: "Culture" })).toHaveAttribute("aria-pressed", "true");

  await page.getByRole("textbox", { name: "Search stories" }).fill("no matching story");
  await expect(page.getByText(/no stories found/i)).toBeVisible();
  await page.getByRole("button", { name: "Clear filters" }).click();
  await expect(storyCards).toHaveCount(6);

  await storyCards.first().click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);

  await page.getByRole("textbox", { name: "Your email address" }).fill("reader@example.com");
  await page.getByRole("button", { name: "Subscribe to the newsletter" }).click();
  await expect(page.getByText(/newsletter delivery isn't connected yet/i)).toBeVisible();
});
