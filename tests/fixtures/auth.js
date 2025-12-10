import { test as base } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage.js";

// Extend base test with authenticated context
export const test = base.extend({
  // Authenticated page fixture
  authenticatedPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);

    // Login with default test user
    await loginPage.navigate();
    await loginPage.login("existingUser", "Password1234");

    // Wait for successful login (profile icon should be visible)
    await page.waitForSelector("#nav-link-profile", { timeout: 10000 });

    // Use the authenticated page
    await use(page);
  },
});

export { expect } from "@playwright/test";
