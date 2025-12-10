import { test } from "./fixtures/auth.js";
import { HomePage } from "../pages/HomePage.js";
import { NewPostPage } from "../pages/NewPostPage.js";
import { ProfilePage } from "../pages/ProfilePage.js";
import path from "path";
import { fileURLToPath } from "url";

// Get current directory for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

test.describe("Create New Post Functionality", () => {
  let createdPostIds = [];

  // AfterEach Hook - Cleanup posts created in each test
  // Ensures tests are independent and can run in parallel

  test.afterEach(async ({ authenticatedPage: page }) => {
    if (createdPostIds.length > 0) {
      console.log(`Cleaning up ${createdPostIds.length} post(s)...`);
      const profilePage = new ProfilePage(page);

      for (let postId of createdPostIds) {
        try {
          await profilePage.deletePostById(postId);
          console.log(`Deleted post ${postId}`);
        } catch (error) {
          console.log(`Failed to delete post ${postId}:`, error.message);
        }
      }

      // Reset the array for next test
      createdPostIds = [];
      console.log("Cleanup completed");
    }
  });

  test("TC01: Successfully create one private post and one public post", async ({
    authenticatedPage: page,
  }) => {
    const homePage = new HomePage(page);
    const newPostPage = new NewPostPage(page);
    // Use absolute path for test image to ensure cross-platform compatibility
    const testImagePath = path.join(__dirname, "../test-data/test-image.jpg");

    // --- STEP 1: Create private post ---
    // Navigate to post creation page
    await homePage.clickNewPost();
    await newPostPage.verifyOnCreatePostPage();

    // Upload image and wait for preview to ensure upload completed
    await newPostPage.uploadImage(testImagePath);
    await newPostPage.verifyImageUploaded();

    // Add unique caption using timestamp to avoid duplicate content issues
    await newPostPage.fillCaption(`Private post - ${Date.now()}`);
    await newPostPage.selectVisibility("private");
    await newPostPage.clickCreatePost();
    // Wait for navigation away from create page to confirm successful creation
    await newPostPage.verifyPostCreatedSuccessfully();

    // Capture the post ID for cleanup
    const privatePostId = await newPostPage.getLastPostId();
    if (privatePostId) createdPostIds.push(privatePostId);

    // --- STEP 2: Create public post ---
    // Repeat process for public post with different visibility setting
    await homePage.clickNewPost();
    await newPostPage.verifyOnCreatePostPage();
    await newPostPage.uploadImage(testImagePath);
    await newPostPage.verifyImageUploaded();
    await newPostPage.fillCaption(`Public post - ${Date.now()}`);
    await newPostPage.selectVisibility("public");
    await newPostPage.clickCreatePost();
    await newPostPage.verifyPostCreatedSuccessfully();

    // Capture the post ID for cleanup
    const publicPostId = await newPostPage.getLastPostId();
    if (publicPostId) createdPostIds.push(publicPostId);
  });

  test("TC02: Successfully create multiple posts with unique captions", async ({
    authenticatedPage: page,
  }) => {
    const homePage = new HomePage(page);
    const newPostPage = new NewPostPage(page);
    const testImagePath = path.join(__dirname, "../test-data/test-image.jpg");

    const postCount = 3;

    for (let i = 1; i <= postCount; i++) {
      const visibility = i % 2 === 0 ? "private" : "public";
      const caption = `Test post #${i} - ${new Date().toLocaleTimeString()}`;

      await homePage.clickNewPost();
      await newPostPage.verifyOnCreatePostPage();
      await newPostPage.uploadImage(testImagePath);
      await newPostPage.verifyImageUploaded();
      await newPostPage.fillCaption(caption);
      await newPostPage.selectVisibility(visibility);
      await newPostPage.clickCreatePost();
      await newPostPage.verifyPostCreatedSuccessfully();

      // Capture the post ID for cleanup
      const postId = await newPostPage.getLastPostId();
      if (postId) createdPostIds.push(postId);
    }
  });

  test("TC03: Cannot create a post without image", async ({
    authenticatedPage: page,
  }) => {
    const homePage = new HomePage(page);
    const newPostPage = new NewPostPage(page);

    await homePage.clickNewPost();
    await newPostPage.verifyOnCreatePostPage();
    await newPostPage.fillCaption("Post without image");
    await newPostPage.selectVisibility("public");
    await newPostPage.clickCreatePost();
    await newPostPage.verifyStillOnCreatePostPage();
    await newPostPage.verifyNoImageUploaded();
  });

  test("TC04: Cannot create post when caption is missing", async ({
    authenticatedPage: page,
  }) => {
    const homePage = new HomePage(page);
    const newPostPage = new NewPostPage(page);
    const testImagePath = path.join(__dirname, "../test-data/test-image.jpg");

    await homePage.clickNewPost();
    await newPostPage.verifyOnCreatePostPage();
    await newPostPage.uploadImage(testImagePath);
    await newPostPage.selectVisibility("public");
    await newPostPage.clickCreatePost();
    await newPostPage.verifyErrorMessageContains("Please enter caption!");
    await newPostPage.verifyStillOnCreatePostPage();
  });
});
