export class BasePage {
  constructor(page) {
    this.page = page;
    this.profileIcon = page.locator("#homeIcon"); // top-left logo
  }
}
