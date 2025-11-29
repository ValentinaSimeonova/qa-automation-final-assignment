import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "tests/",
  timeout: 30_000,

  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,

  reporter: [["html"]],
  workers: 1, //  Run tests one at a time
  use: {
    headless: false,
    baseURL: process.env.BASE_URL || "http://training.skillo-bg.com:4300",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },

  // Cross-browser example (disabled)
  // projects: [
  //   {
  //     name: "chromium",
  //     use: { ...devices["Desktop Chrome"] },
  //   },
  //   {
  //     name: "firefox",
  //     use: { ...devices["Desktop Firefox"] },
  //   },
  //   {
  //     name: "webkit",
  //     use: { ...devices["Desktop Safari"] },
  //   },
  // ],
});
