import { BasePage } from "./BasePage.js";
import { expect } from "@playwright/test";

// Handles user profile functionality including managing posts (delete)
// and viewing profile information

export class ProfilePage extends BasePage {
  constructor(page) {
    super(page);

    // --- ACTION BUTTONS ---
    this.editProfileButton = page.locator('button:has-text("Edit Profile")'); // Only visible on own profile

    // --- USER POSTS ---
    this.userPosts = page.locator(".post-feed-img"); // All posts in grid

    // --- POST MODALS & DELETION ---
    this.deletePostLink = page.locator('a:has-text("Delete post")'); // Delete link
    this.confirmDeleteButton = page.locator(
      '.modal-footer button:has-text("Yes")'
    ); // Confirm deletion
  }

  /**
   * Navigate to a user's profile page
   * @param {string} username - Username of the profile to visit
   */
  async navigateToProfile(username) {
    await super.navigate(`/users/${username}`);
  }

  /**
   * Get all posts for the current profile
   * @returns {Promise<Array>} Array of post elements
   */
  async getAllPosts() {
    // Wait 1 second for posts grid to fully render
    // Application uses lazy loading for post images
    await this.page.waitForTimeout(1000);
    return await this.userPosts.all();
  }

  // Delete all posts from the profile
  // Used in test cleanup to remove test data
  // Loops through posts one by one until all are deleted

  async deleteAllPosts() {
    let posts = await this.getAllPosts();

    // Loop while there are posts to delete
    // Must click first post each time as DOM updates after deletion
    while (posts.length > 0) {
      // Open first post modal
      await this.userPosts.first().click();

      // Wait for post modal to fully load with delete button
      // Modal animation takes ~500ms to complete
      await this.page.waitForTimeout(1000);

      // Click delete link in modal
      await this.deletePostLink.click();

      // Wait for confirmation dialog to appear
      // Short delay needed before clicking confirm button
      await this.page.waitForTimeout(500);
      await this.confirmDeleteButton.click();

      // Wait for deletion to complete and page to refresh
      // Application shows success toast and updates post grid
      await this.page.waitForTimeout(1500);

      // Refresh post list to check if more posts remain
      posts = await this.getAllPosts();
    }
  }

  // Verify edit profile button is not visible
  // Used to confirm user is logged out or viewing someone else's profile

  async verifyEditProfileNotVisible() {
    await expect(this.editProfileButton).toBeHidden({ timeout: 2000 });
  }

  /**
   * Delete a specific post by its ID
   * @param {string} postId - The ID of the post to delete
   */
  async deletePostById(postId) {
    // Navigate to the specific post
    await this.page.goto(`http://training.skillo-bg.com:4300/posts/${postId}`);
    await this.page.waitForTimeout(1000);

    // Click delete link in post view
    await this.deletePostLink.click();

    // Wait for confirmation dialog and confirm deletion
    await this.page.waitForTimeout(500);
    await this.confirmDeleteButton.click();

    // Wait for deletion to complete
    await this.page.waitForTimeout(1500);
  }
}
