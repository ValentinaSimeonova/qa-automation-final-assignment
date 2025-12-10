import { BasePage } from "./BasePage.js";
import { expect } from "@playwright/test";
// Handles navigation, user menu actions (logout), and post browsing functionality
export class HomePage extends BasePage {
  constructor(page) {
    super(page);

    // --- NAVIGATION ELEMENTS ---
    this.profileLink = page.locator("#nav-link-profile"); // Used in login tests
    this.newPostLink = page.locator("#nav-link-new-post"); // Used in login tests
    this.loginLink = page.locator("#nav-link-login"); // Visible when logged out
    this.logoutButton = page.locator("i.fa-sign-out-alt"); // Logout button in dropdown
  }

  // Navigate to current user's profile page
  async goToProfile() {
    await this.profileLink.click();
  }

  // Navigate to create new post page
  async clickNewPost() {
    await this.newPostLink.click();
  }

  //  Perform logout action
  //  Opens profile dropdown and clicks logout button
  //  Waits for logout to complete (login link becomes visible)

  async clickLogout() {
    // Open profile dropdown menu
    await this.profileLink.click();

    // Wait for logout button to appear in dropdown
    await this.logoutButton.waitFor({ state: "visible", timeout: 2000 });

    // Click logout
    await this.logoutButton.click();

    // Wait for logout to complete (login link appears)
    await this.loginLink.waitFor({ state: "visible", timeout: 5000 });
  }

  // Verify user is logged in
  // Checks that profile link is visible in navigation

  async verifyUserLoggedIn() {
    await expect(this.profileLink).toBeVisible({ timeout: 5000 });
  }

  // Verify user is logged out
  // Checks that login link is visible and profile link is hidden

  async verifyUserLoggedOut() {
    await expect(this.loginLink).toBeVisible({ timeout: 5000 });
    await expect(this.profileLink).toBeHidden({ timeout: 2000 });
  }

  // Perform complete logout flow
  // Wrapper method for logout action

  async performLogout() {
    await this.clickLogout();
  }

  // Verify profile link is visible
  // Used to confirm successful login

  async verifyProfileLinkVisible() {
    await expect(this.profileLink).toBeVisible({ timeout: 10000 });
  }

  // Verify new post link is visible
  // Used to confirm navigation menu is accessible

  async verifyNewPostLinkVisible() {
    await expect(this.newPostLink).toBeVisible({ timeout: 5000 });
  }
}
