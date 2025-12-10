import { test } from "./fixtures/base.js";
import testData from "../test-data/users.js";

test.describe("User Logout", () => {
  // Before Each Test - Setup
  // Ensures user is authenticated before running each logout test

  test.beforeEach(async ({ loginPage }) => {
    // Navigate to login page and authenticate
    await loginPage.navigate();
    await loginPage.login(
      testData.validUser.username,
      testData.validUser.password
    );

    // Verify login was successful before proceeding
    await loginPage.verifyLoginSuccessful();
  });

  test("TC01: Successfully logout from home page", async ({ homePage }) => {
    // Verify user is logged in before attempting logout
    // Profile link should be visible in navigation bar
    await homePage.verifyUserLoggedIn();

    // opens dropdown menu and clicks logout
    await homePage.performLogout();

    // Verify logout was successful
    // Login link should now be visible and profile link should be hidden
    await homePage.verifyUserLoggedOut();
  });

  test("TC02: Session not restored after page refresh", async ({
    homePage,
  }) => {
    // Perform logout to end session
    await homePage.performLogout();

    // Refresh the page to test if session is restored
    // Expected: User should remain logged out after refresh
    await homePage.refreshPage();

    // Verify user is still logged out after page reload
    // This ensures session cookies are properly cleared on logout
    await homePage.verifyUserLoggedOut();
  });
  test("TC03: Cannot access protected pages after logout", async ({
    homePage,
    profilePage,
  }) => {
    // Perform logout to end user session
    await homePage.performLogout();

    // Verify logout was successful
    await homePage.verifyUserLoggedOut();

    // Attempt to access protected page (user profile) after logout
    // Navigate to profile page using direct URL navigation
    await profilePage.navigate(testData.validUser.username);

    // Verify access is denied - edit profile button should not be visible
    // This confirms user is logged out and viewing profile as guest
    await profilePage.verifyEditProfileNotVisible();
  });
});
