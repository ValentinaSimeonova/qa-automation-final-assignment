# Skillo Social Media - Test Automation Suite

![Playwright](https://img.shields.io/badge/Playwright-45ba4b?style=for-the-badge&logo=playwright&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)

## 📖 Project Overview

This project provides automated end-to-end tests for the **Skillo Social Media Platform**, developed using **Playwright**.  
It validates core flows such as:

- Registration
- Login
- Logout
- Post creation

**Application Under Test:** [Skillo Social Media](http://training.skillo-bg.com:4300)

The test suite covers critical user workflows including registration, authentication, session management, and content creation with both positive and negative test scenarios.

## 🎯 Project Purpose

This suite was created to:

The suite was created to:

- Verify main user features
- Detect regressions early
- Demonstrate automation skills
- Support future CI/CD execution
- Apply Page Object Model design

## 🛠️ Technologies Used

| Technology            | Version | Purpose                              |
| --------------------- | ------- | ------------------------------------ |
| **Playwright**        | 1.49.1  | UI automation framework              |
| **Node.js**           | 18+     | JavaScript runtime environment       |
| **JavaScript (ES6+)** | Modules | Programming language with ES modules |
| **ESLint**            | 9.17.0  | Code quality and linting             |

## 📋 Prerequisites

Before running this project, ensure you have the following installed:

- **Node.js** (v18.0.0 or higher)
- **npm** (v9.0.0 or higher)
- **Git** (for version control)

To check your versions:

```powershell
node --version
npm --version
git --version
```

## 🚀 Installation

### 1. Clone the Repository

```powershell
git clone https://github.com/ValentinaSimeonova/qa-automation-final-assignment.git
cd qa-automation-final-assignment
```

### 2. Install Dependencies

```powershell
npm install
```

### 3. Install Playwright Browsers

```powershell
npx playwright install
```

## ▶️ Running Tests

### Run All Tests

```powershell
# Run all tests in headless mode
npx playwright test

# Run all tests in headed mode (see browser)
npx playwright test --headed

# Run tests with UI mode (interactive)
npx playwright test --ui
```

### Run Specific Test Suites

```powershell
# Run only registration tests
npx playwright test registration.spec.js

# Run only login tests
npx playwright test login.spec.js

# Run only logout tests
npx playwright test logout.spec.js

# Run only new post tests
npx playwright test newPost.spec.js
```

### Run Specific Test Cases

```powershell
# Run a specific test by name
npx playwright test -g "TC01: Successful login"

# Run tests matching a pattern
npx playwright test -g "registration"
```

### Debug Tests

```powershell
# Run in debug mode with Playwright Inspector
npx playwright test --debug

# Debug a specific test
npx playwright test login.spec.js --debug
```

### View Test Reports

```powershell
# Generate and open HTML report
npx playwright show-report
```

## 📁 Project Structure

```
skillo-automation-project/
│
├── .vscode/                        # VS Code workspace settings
│   ├── extensions.json             # Recommended extensions
│   └── settings.json               # Workspace settings
│
├── pages/                          # Page Object Model classes
│   ├── BasePage.js                 # Base page with common methods
│   ├── RegistrationPage.js         # Registration page object
│   ├── LoginPage.js                # Login page object
│   ├── HomePage.js                 # Home/Posts page object
│   ├── NewPostPage.js              # New post creation page object
│   └── ProfilePage.js              # User profile page object
│
├── tests/                          # Test specifications
│   ├── fixtures/                   # Custom Playwright fixtures
│   │   ├── base.js                 # Base extended test
│   │   └── auth.js                 # Authentication fixture
│   ├── registration.spec.js        # Registration tests (3 tests)
│   ├── login.spec.js               # Login tests (3 tests)
│   ├── logout.spec.js              # Logout tests (3 tests)
│   └── newPost.spec.js             # New post tests (4 tests)
│
├── test-data/                      # Test data files
│   ├── users.js                    # User credentials and test data
│   └── test-image.jpg              # Sample image for post creation
│
├── playwright-report/              # HTML test reports (generated)
├── test-results/                   # Test execution artifacts (generated)
│
├── .gitignore                      # Git ignore file
├── eslint.config.mjs               # ESLint configuration
├── package.json                    # NPM dependencies
├── playwright.config.js            # Playwright configuration
├── README.md                       # Project documentation (this file)
```

## 🧪 Test Scenarios

### 📝 Registration Tests (3 test cases)

| Test Case | Type        | Description                               |
| --------- | ----------- | ----------------------------------------- |
| **TC01**  | ✅ Positive | Successful registration with valid data   |
| **TC02**  | ❌ Negative | Registration fails with existing username |
| **TC03**  | ❌ Negative | Password field minimum length validation  |

**Coverage:**

- Form field validation
- Error message verification
- Unique username requirement
- Password complexity rules
- Data-driven testing approach

---

### 🔐 Login Tests (3 test cases)

| Test Case | Type        | Description                             |
| --------- | ----------- | --------------------------------------- |
| **TC01**  | ✅ Positive | Successful login with valid credentials |
| **TC02**  | ❌ Negative | Login fails with invalid username       |
| **TC03**  | ❌ Negative | Login fails with wrong password         |

**Coverage:**

- Authentication flow
- Error handling and messages
- Session creation
- Navigation after login
- Form validation

---

### 🚪 Logout Tests (3 test cases)

| Test Case | Type        | Description                                |
| --------- | ----------- | ------------------------------------------ |
| **TC01**  | ✅ Positive | Successfully logout from home page         |
| **TC02**  | ✅ Positive | Session not restored after page refresh    |
| **TC03**  | ✅ Positive | Cannot access protected pages after logout |

**Coverage:**

- Session termination
- Protected route access control
- Session persistence validation
- UI state verification after logout

---

### 📸 New Post Tests (4 test cases)

| Test Case | Type        | Description                                          |
| --------- | ----------- | ---------------------------------------------------- |
| **TC01**  | ✅ Positive | Successfully create one private and one public post  |
| **TC02**  | ✅ Positive | Successfully create multiple posts with unique names |
| **TC03**  | ❌ Negative | Cannot create a post without image                   |
| **TC04**  | ❌ Negative | Cannot create post when caption is missing           |

**Coverage:**

- File upload functionality
- Post visibility settings (public/private)
- Form validation
- Multiple post creation workflow
- Required field verification
- Cleanup with afterAll hook

---

## 📊 Test Coverage Summary

- **Total Test Cases:** 13
- **Positive Tests:** 6 (46%)
- **Negative Tests:** 7 (54%)
- **Test Suites:** 4 (Registration, Login, Logout, New Post)
- **Page Objects:** 6 (BasePage, RegistrationPage, LoginPage, HomePage, NewPostPage, ProfilePage)
- **Test Fixtures:** 2 (base.js for POMs, auth.js for authentication)

## 🏗️ Architecture

### Page Object Model (POM)

This project implements the **Page Object Model** design pattern for maintainable and scalable test automation.

#### Benefits:

- ✅ **Separation of Concerns** - UI locators separated from test logic
- ✅ **Code Reusability** - Page methods used across multiple tests
- ✅ **Maintainability** - UI changes only require updates to page objects
- ✅ **Readability** - Tests read like user actions

#### Structure:

```javascript
// BasePage.js - Common functionality
export class BasePage {
  constructor(page) {
    this.page = page;
    // Common elements (header, footer, navigation)
  }
  // Common methods used across pages
}

// Specific Page Objects extend BasePage
export class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    // Page-specific locators
  }
  // Page-specific methods
}
```

### Test Fixtures

Custom Playwright fixtures provide enhanced testing capabilities:

#### **Base Fixture (`tests/fixtures/base.js`):**

- Pre-instantiates all Page Object Models as fixtures
- Eliminates repetitive `new PageObject(page)` calls
- Provides: `loginPage`, `homePage`, `profilePage`, `registrationPage`, `newPostPage`
- Used across all test files for cleaner test code

**Usage:**

```javascript
import { test } from "./fixtures/base.js";

test("Login test", async ({ loginPage, homePage }) => {
  // Page objects ready to use - no instantiation needed
  await loginPage.navigate();
  await loginPage.login("user", "pass");
  await homePage.verifyProfileLinkVisible();
});
```

#### **Authentication Fixture (`tests/fixtures/auth.js`):**

- Pre-authenticates users for tests requiring login
- Reduces test execution time by 2-3 seconds per test
- Provides `authenticatedPage` fixture to tests
- Used in newPost tests where authentication is required

**Usage:**

```javascript
import { test } from "./fixtures/auth.js";

test("Create post", async ({ authenticatedPage: page }) => {
  // User is already logged in - skip authentication
  const homePage = new HomePage(page);
  await homePage.clickNewPost();
});
```

### Test Data Management

Centralized test data in `test-data/` directory:

- **`users.js`** - Valid/invalid user credentials
- **`registration.js`** - Registration test data with factory functions
- **`test-image.jpg`** - Sample image for post creation tests
- Reusable across test suites
- Easy to maintain and update
- Data-driven testing approach

## ⚙️ Playwright Configuration

The `playwright.config.js` provides:

### Core Configuration

| Feature      | Configuration                        | Purpose                              |
| ------------ | ------------------------------------ | ------------------------------------ |
| **Base URL** | `http://training.skillo-bg.com:4300` | Enables relative navigation in tests |
| **Timeout**  | 30 seconds                           | Maximum time for test execution      |
| **Workers**  | 4                                    | Parallel test execution              |
| **Retries**  | 0 locally, 2 in CI                   | Retry flaky tests in CI/CD           |

### Debugging & Reporting

| Feature         | Setting             | Benefit                                  |
| --------------- | ------------------- | ---------------------------------------- |
| **Screenshots** | `only-on-failure`   | Captures evidence when tests fail        |
| **Video**       | `retain-on-failure` | Records browser session for debugging    |
| **Trace**       | `on-first-retry`    | Detailed execution trace for analysis    |
| **HTML Report** | Enabled             | Comprehensive test results visualization |

### Cross-Browser Support

The configuration supports testing across:

- ✅ **Chromium** (Chrome, Edge)
- ✅ **Firefox**
- ✅ **WebKit** (Safari)

## 🎨 Code Quality

### ESLint

- **Configuration:** `eslint.config.mjs` (Flat config)
- **Rules:** ESLint recommended rules
- **Environment:** Browser + Node.js globals

### Prettier

- **Purpose:** Code formatting
- **Configuration:** Default settings
- **Integration:** Works with ESLint

### Best Practices Implemented

✅ **No arbitrary timeouts** - Uses Playwright's auto-waiting
✅ **Proper locator strategy** - Centralized in Page Objects
✅ **Async/await patterns** - Consistent asynchronous handling
✅ **Independent tests** - Each test can run in isolation
✅ **Descriptive naming** - Clear test and method names
✅ **Error handling** - Proper assertions and expectations
✅ **Data-driven tests** - Parameterized test scenarios

## 🐛 Known Issues

## - Response delays may require retry/waiting

## - Post cleanup may need extended timeout when many posts exist

## 🔮 Future Improvements

### Future Enhancements

1. **API Testing Integration**
   - Use Playwright's API testing for faster authentication
   - API-based test data cleanup
   - Reduce UI test execution time by 50%

2. **Visual Regression Testing**
   - Add screenshot comparison tests with Percy or Playwright visual comparisons
   - Detect unintended UI changes automatically

3. **Performance Testing**
   - Add performance metrics collection using Playwright's performance APIs
   - Monitor page load times and Core Web Vitals

4. **Enhanced Reporting**
   - Integrate with Allure Reporter for detailed test reports
   - Add custom reporters with test execution analytics

5. **CI/CD Integration**
   - GitHub Actions workflow for automated test execution
   - Run tests on PR creation and merge
   - Parallel execution across multiple browsers

6. **Test Data Factory**
   - Dynamic test data generation with Faker.js
   - Database cleanup utilities for better test isolation

7. **Accessibility Testing**
   - Add axe-core integration for accessibility validation
   - WCAG compliance checks

8. **Mobile Testing**
   - Add mobile viewport configurations
   - Test responsive design

## 👤 Author

**Valentina Simeonova**

- GitHub: [@ValentinaSimeonova](https://github.com/ValentinaSimeonova)
- Project: [qa-automation-final-assignment](https://github.com/ValentinaSimeonova/qa-automation-final-assignment)

## 📄 License

Developed as a final automation assignment
Skillo Academy (2025)
