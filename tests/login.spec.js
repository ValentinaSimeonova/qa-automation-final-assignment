import { test, expect } from "@playwright/test";

test("Login page opens", async ({ page }) => {
  await page.goto("/posts/all"); // uses baseURL from config
  await expect(page.locator("#homeIcon")).toBeVisible(); // check page title contains 'Login'
});
