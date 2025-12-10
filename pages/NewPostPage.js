import { BasePage } from "./BasePage.js";
import { expect } from "@playwright/test";

// Handles post creation functionality including image upload,
// caption entry, visibility selection, and validation

export class NewPostPage extends BasePage {
  constructor(page) {
    super(page);

    // --- FILE UPLOAD ---
    this.fileInput = page.locator('input[type="file"]').first(); // Hidden file input
    this.uploadedImage = page.locator(".image-preview"); // Preview of uploaded image

    // --- FORM FIELDS ---
    this.captionInput = page.locator('input[formcontrolname="caption"]');
    this.publicSwitch = page.locator('label:has-text("Public")'); // Public visibility toggle
    this.privateSwitch = page.locator('label:has-text("Private")'); // Private visibility toggle

    // --- BUTTONS ---
    this.createPostButton = page.locator('button:has-text("Create Post")');
  }

  /**
   * Upload an image file
   * @param {string} filePath - Absolute path to image file
   */
  async uploadImage(filePath) {
    await this.fileInput.setInputFiles(filePath);
  }

  /**
   * Fill caption text for the post
   * @param {string} caption - Post caption/description
   */
  async fillCaption(caption) {
    await this.captionInput.waitFor({ state: "visible" });
    await this.captionInput.fill(caption);
  }

  /**
   * Select post visibility (public or private)
   * @param {string} visibility - Either "public" or "private"
   */
  async selectVisibility(visibility) {
    if (visibility === "public") {
      await this.publicSwitch.click();
    } else if (visibility === "private") {
      await this.privateSwitch.click();
    }
  }

  /**
   * Click create post button to submit the post
   */
  async clickCreatePost() {
    await this.createPostButton.click();
  }

  /**
   * Get error message text related to caption validation
   * @returns {Promise<string>} Error message text
   */
  async getErrorMessage() {
    const errorToast = this.page.locator(
      '#toast-container .toast-message:has-text("caption")'
    );

    await errorToast.waitFor({ state: "visible" });
    return await errorToast.innerText();
  }

  /**
   * Verify user is on the create post page
   * Checks URL contains /posts/create path
   */
  async verifyOnCreatePostPage() {
    await expect(this.page).toHaveURL(/\/posts\/create/, { timeout: 10000 });
  }

  /**
   * Verify post was created successfully
   * Checks navigation away from create post page
   */
  async verifyPostCreatedSuccessfully() {
    // Wait for navigation away from create page (either to profile or posts feed)
    await expect(this.page).not.toHaveURL(/\/posts\/create/, {
      timeout: 15000,
    });
  }

  /**
   * Get the ID of the last created post from current URL
   * Should be called after post creation when redirected to post detail page
   * @returns {Promise<string|null>} Post ID or null if not on post detail page
   */
  async getLastPostId() {
    const url = this.page.url();
    const match = url.match(/\/posts\/(\d+)/);
    return match ? match[1] : null;
  }

  // Verify still on create post page (validation failed)
  // Used to confirm form validation errors prevented submission

  async verifyStillOnCreatePostPage() {
    await expect(this.page).toHaveURL(/\/posts\/create/, { timeout: 2000 });
  }

  // Verify image preview is visible after upload
  // Confirms image was successfully uploaded and preview rendered

  async verifyImageUploaded() {
    await expect(this.uploadedImage).toBeVisible({ timeout: 5000 });
  }

  // Verify no image has been uploaded
  // Checks that image preview is not visible

  async verifyNoImageUploaded() {
    await expect(this.uploadedImage).toBeHidden({ timeout: 2000 });
  }

  /**
   * Verify error message contains expected text
   * @param {string} expectedText - Expected error message
   */
  async verifyErrorMessageContains(expectedText) {
    const errorToast = this.page.locator(
      '#toast-container .toast-message:has-text("caption")'
    );
    await expect(errorToast).toBeVisible({ timeout: 5000 });
    await expect(errorToast).toContainText(expectedText);
  }
}
