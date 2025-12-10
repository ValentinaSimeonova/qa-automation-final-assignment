import { test } from "./fixtures/base.js";
import testData from "../test-data/users.js";

test.describe("User Login:", () => {
  test("TC01: Successful login with valid credentials", async ({
    loginPage,
    homePage,
  }) => {
    await loginPage.navigate();
    await loginPage.login(
      testData.validUser.username,
      testData.validUser.password
    );

    await homePage.verifyProfileLinkVisible();
    await homePage.verifyNewPostLinkVisible();
  });

  test("TC02: Login fails with wrong username", async ({ loginPage }) => {
    // Attempt login with invalid username from test data
    // Expected: Error toast should appear with message
    await loginPage.navigate();
    await loginPage.login(
      testData.invalidUsers[0].username,
      testData.invalidUsers[0].password
    );

    // Verify error message is displayed
    await loginPage.verifyErrorMessage("Wrong username or password");
  });

  test("TC03: Login fails with wrong password", async ({ loginPage }) => {
    // Attempt login with valid username but invalid password
    // Expected: Error toast should appear with message
    await loginPage.navigate();
    await loginPage.login(
      testData.invalidUsers[1].username,
      testData.invalidUsers[1].password
    );

    // Verify error message is displayed
    await loginPage.verifyErrorMessage("Wrong username or password");
  });
});
