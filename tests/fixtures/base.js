import { test as base } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage.js";
import { HomePage } from "../../pages/HomePage.js";
import { ProfilePage } from "../../pages/ProfilePage.js";
import { RegistrationPage } from "../../pages/RegistrationPage.js";
import { NewPostPage } from "../../pages/NewPostPage.js";

// Extended Playwright test with page object fixtures
// This makes page objects available to all tests without manual instantiation

export const test = base.extend({
  // Login Page fixture
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  // Home Page fixture
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },

  // Profile Page fixture
  profilePage: async ({ page }, use) => {
    const profilePage = new ProfilePage(page);
    await use(profilePage);
  },

  // Registration Page fixture
  registrationPage: async ({ page }, use) => {
    const registrationPage = new RegistrationPage(page);
    await use(registrationPage);
  },

  // New Post Page fixture
  newPostPage: async ({ page }, use) => {
    const newPostPage = new NewPostPage(page);
    await use(newPostPage);
  },

  
});

// Re-export expect for convenience
export { expect } from "@playwright/test";
