import { BasePage } from "./BasePage.js";
import { expect } from "@playwright/test";

// Handles user authentication functionality including login form
// and login verification

export class LoginPage extends BasePage {
  constructor(page) {
    super(page);

    // --- FORM ELEMENTS ---
    this.usernameInput = page.locator("#defaultLoginFormUsername");
    this.passwordInput = page.locator("#defaultLoginFormPassword");
    this.loginButton = page.locator("#sign-in-button");

    // --- ERROR MESSAGES ---
    this.errorToast = page.locator("#toast-container"); // Used in login tests
  }

  // Navigate to login page and wait for form to be ready

  async navigate() {
    await super.navigate("/users/login");
    await this.loginButton.waitFor({ state: "visible" });
  }

  /**
   * Fill username field
   * Clears existing value before filling
   * @param {string} username - Username or email
   */
  async fillUsername(username) {
    await this.usernameInput.clear();
    await this.usernameInput.fill(username);
  }

  /**
   * Fill password field
   * Clears existing value before filling
   * @param {string} password - User password
   */
  async fillPassword(password) {
    await this.passwordInput.clear();
    await this.passwordInput.fill(password);
  }

  //Click login button to submit credentials

  async clickLogin() {
    await this.loginButton.click();
  }

  /**
   * Complete login flow
   * @param {string} username - Username or email
   * @param {string} password - User password
   * @param {boolean} rememberMe - Whether to check remember me (default: false)
   */
  async login(username, password, rememberMe = false) {
    await this.fillUsername(username);
    await this.fillPassword(password);

    if (rememberMe) {
      await this.checkRememberMe();
    }

    await this.clickLogin();
  }

  /**
   * Complete login with credentials and wait for navigation
   * Used in test cleanup and fixtures
   * @param {string} username - Username
   * @param {string} password - Password
   */
  async loginWithCredentials(username, password) {
    await super.navigate("/users/login");
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    // Wait for successful navigation to posts feed
    await this.page.waitForURL(/\/posts\/all/, { timeout: 10000 });
  }

  /**
   * Verify login was successful
   * Waits for profile link to appear in navigation
   */
  async verifyLoginSuccessful() {
    const profileLink = this.page.locator("#nav-link-profile");
    await expect(profileLink).toBeVisible({ timeout: 10000 });
  }

  // Verify error toast is visible
  // Used to check login failures

  async verifyErrorToastVisible() {
    await expect(this.errorToast).toBeVisible({ timeout: 5000 });
  }

  /**
   * Verify error toast contains expected error message
   * @param {string} expectedText - Expected error message text
   */
  async verifyErrorMessage(expectedText) {
    await expect(this.errorToast).toBeVisible({ timeout: 5000 });
    await expect(this.errorToast).toContainText(expectedText);
  }
}
