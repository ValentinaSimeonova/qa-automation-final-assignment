import { BasePage } from "./BasePage.js";
import { expect } from "@playwright/test";

// Handles user registration functionality including form filling,
// validation, and verification of registration success/failure

export class RegistrationPage extends BasePage {
  constructor(page) {
    super(page);

    // --- FORM FIELDS ---
    // Using accessible role-based locators for better reliability
    this.usernameInput = page.getByRole("textbox", { name: "Username" });
    this.emailInput = page.getByRole("textbox", { name: "email" });
    this.birthDateInput = page.getByPlaceholder("Birth date");
    this.passwordInput = page.getByRole("textbox", {
      name: "Password",
      exact: true, // Ensure exact match to avoid confusion with confirm password
    });
    this.confirmPasswordInput = page.getByRole("textbox", {
      name: "Confirm Password",
    });
    this.publicInfoInput = page.getByRole("textbox", { name: "Public info" });

    // --- BUTTONS ---
    this.registerButton = page.locator("#sign-in-button");

    // --- ERROR MESSAGES ---
    this.errorToast = page.locator("#toast-container"); // Toast notifications
    this.passwordValidationError = page.locator("span.invalid-feedback"); // Inline validation errors
  }

  // Navigate to registration page

  async navigate() {
    await super.navigate("/users/register");
  }

  // --- INDIVIDUAL FORM FIELD METHODS ---
  /**
   * Fill username field
   * @param {string} username - Username to register
   */
  async fillUsername(username) {
    await this.usernameInput.fill(username);
  }

  /**
   * Fill email field
   * @param {string} email - Email address
   */
  async fillEmail(email) {
    await this.emailInput.fill(email);
  }

  /**
   * Fill birth date field
   * @param {string} date - Date in format yyyy-mm-dd
   */
  async fillBirthDate(date) {
    await this.birthDateInput.fill(date);
  }

  /**
   * Fill password field
   * @param {string} password - Password
   */
  async fillPassword(password) {
    await this.passwordInput.fill(password);
  }

  /**
   * Fill confirm password field
   * @param {string} password - Password confirmation
   */
  async fillConfirmPassword(password) {
    await this.confirmPasswordInput.fill(password);
  }

  /**
   * Fill public info field
   * @param {string} info - Public bio information
   */
  async fillPublicInfo(info) {
    await this.publicInfoInput.fill(info);
  }

  // Click register button to submit form
  async clickRegister() {
    await this.registerButton.click();
  }

  /**
   * Complete registration flow with all user data
   * @param {Object} userData - User registration data object
   * @param {string} userData.username - Username
   * @param {string} userData.email - Email address
   * @param {string} userData.birthDate - Birth date (yyyy-mm-dd)
   * @param {string} userData.password - Password
   * @param {string} userData.confirmPassword - Password confirmation
   * @param {string} userData.publicInfo - Public bio
   */
  async registerUser(userData) {
    await this.fillUsername(userData.username);
    await this.fillEmail(userData.email);
    await this.fillBirthDate(userData.birthDate);
    await this.fillPassword(userData.password);
    await this.fillConfirmPassword(userData.confirmPassword);
    await this.fillPublicInfo(userData.publicInfo);
    await this.clickRegister();
  }

  //Verify that registration was successful
  //Waits for profile link to appear after successful registration
  async verifyRegistrationSuccessful() {
    await this.page.waitForSelector("#nav-link-profile", { timeout: 10000 });
  }

  // Verify error toast is visible
  // Used to check registration failures

  async verifyErrorToastVisible() {
    await expect(this.errorToast).toBeVisible({ timeout: 5000 });
  }

  /**
   * Verify error toast contains expected error text
   * @param {string} expectedText - Expected error message
   */
  async verifyErrorToastContains(expectedText) {
    await expect(this.errorToast).toBeVisible({ timeout: 5000 });
    await expect(this.errorToast).toContainText(expectedText);
  }

  /**
   * Verify password validation error appears with expected message
   * @param {string} expectedText - Expected validation error text
   */
  async verifyPasswordValidationError(expectedText) {
    await expect(this.passwordValidationError).toBeVisible({ timeout: 3000 });
    await expect(this.passwordValidationError).toContainText(expectedText);
  }

  // Verify password validation error is hidden
  // Used to verify error disappears after fixing validation issue

  async verifyPasswordValidationErrorHidden() {
    await expect(this.passwordValidationError).toBeHidden({ timeout: 3000 });
  }
}
