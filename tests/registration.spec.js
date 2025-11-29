import { test, expect } from "@playwright/test";
import { RegistrationPage } from "../pages/RegistrationPage";
import { BasePage } from "../pages/BasePage";

// Generate random data for unique users
function randomString() {
  return Math.random().toString(36).substring(2, 8);
}

test.describe("User Registration form:", () => {
  test("TC01: Successful registration with valid data", async ({ page }) => {
    const registrationPage = new RegistrationPage(page);
    const basePage = new BasePage(page);

    const username = "user_" + randomString();
    const email = username + "@test.com";

    await registrationPage.navigate();

    await registrationPage.fillUsername(username);
    await registrationPage.fillEmail(email);
    await registrationPage.fillBirthDate("2000-10-12");
    await registrationPage.fillPassword("Pass1234");
    await registrationPage.fillConfirmPassword("Pass1234");
    await registrationPage.fillPublicInfo("Test user info");

    await registrationPage.clickRegister();

    await expect(basePage.profileIcon).toBeVisible();
  });

  test("TC02: Registration fails with existing username", async ({ page }) => {
    const registrationPage = new RegistrationPage(page);

    await registrationPage.navigate();

    await registrationPage.fillUsername("existingUser");
    await registrationPage.fillEmail("existing@test.com");
    await registrationPage.fillBirthDate("2001-11-12");
    await registrationPage.fillPassword("Password1234");
    await registrationPage.fillConfirmPassword("Password1234");
    await registrationPage.fillPublicInfo("Test user info");
    await registrationPage.clickRegister();

    await expect(registrationPage.errorToast).toBeVisible();
    await expect(registrationPage.errorToast).toContainText("Username taken");
  });

  test("TC03: Password validation requirements", async ({ page }) => {
    const registrationPage = new RegistrationPage(page);

    await registrationPage.navigate();

    // Type a short password (less than 6 chars)
    await registrationPage.fillPassword("abc");

    // Assert error message appears
    await expect(page.locator("span.invalid-feedback")).toBeVisible();
    await expect(page.locator("span.invalid-feedback")).toContainText(
      "Minimum 6 characters"
    );

    // Type a valid password (6+ characters)
    await registrationPage.fillPassword("Pass1234");

    // Error message should disappear
    await expect(page.locator("span.invalid-feedback")).not.toBeVisible();
  });
});
