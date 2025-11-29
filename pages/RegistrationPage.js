export class RegistrationPage {
  constructor(page) {
    this.page = page;

    // --- FORM FIELDS ---
    this.usernameInput = page.getByRole("textbox", { name: "Username" });
    this.emailInput = page.getByRole("textbox", { name: "email" });
    this.birthDateInput = page.getByPlaceholder("Birth date");
    this.passwordInput = page.getByRole("textbox", {
      name: "Password",
      exact: true,
    });
    this.confirmPasswordInput = page.getByRole("textbox", {
      name: "Confirm Password",
    });
    this.publicInfoInput = page.getByRole("textbox", { name: "Public info" });

    // --- BUTTONS ---
    this.registerButton = page.locator("#sign-in-button");

    // --- ERRORS ---
    this.errorToast = page.locator("#toast-container");
  }

  // Navigate to the page
  async navigate() {
    await this.page.goto("/users/register");
  }

  // --- INDIVIDUAL FILL FUNCTIONS ---
  async fillUsername(username) {
    await this.usernameInput.fill(username);
  }

  async fillEmail(email) {
    await this.emailInput.fill(email);
  }

  async fillBirthDate(date) {
    await this.birthDateInput.fill(date); // yyyy-mm-dd
  }

  async fillPassword(password) {
    await this.passwordInput.fill(password);
  }

  async fillConfirmPassword(password) {
    await this.confirmPasswordInput.fill(password);
  }

  async fillPublicInfo(info) {
    await this.publicInfoInput.fill(info);
  }

  async clickRegister() {
    await this.registerButton.click();
  }

  async isErrorVisible() {
    return await this.errorToast.isVisible();
  }
}
