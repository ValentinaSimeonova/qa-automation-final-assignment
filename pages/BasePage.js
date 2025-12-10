export class BasePage {
  constructor(page) {
    this.page = page;

    // Common navigation elements
    this.profileIcon = page.locator("#nav-link-profile");
    this.loginLink = page.locator("#nav-link-login");
    this.logo = page.locator(".navbar-brand");
  }

  /**
   * Navigate to a specific path (uses baseURL from config)
   * @param {string} path - Relative path to navigate to
   */
  async navigate(path = "/") {
    await this.page.goto(path);
  }

  /**
   * Wait for page to be fully loaded
   */
  async waitForPageLoad() {
    await this.page.waitForLoadState("networkidle");
  }

  /**
   * Get current page URL
   * @returns {string} Current URL
   */
  async getCurrentUrl() {
    return this.page.url();
  }

  /**
   * Refresh the current page
   */
  async refreshPage() {
    await this.page.reload();
  }
}
