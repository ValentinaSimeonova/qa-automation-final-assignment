// Generate random data for unique users
function randomString() {
  return Math.random().toString(36).substring(2, 8);
}

export const registrationData = {
  validUser: () => {
    const username = "user_" + randomString();
    return {
      username: username,
      email: username + "@test.com",
      birthDate: "2000-10-12",
      password: "Pass1234",
      confirmPassword: "Pass1234",
      publicInfo: "Automated test user",
    };
  },

  existingUser: {
    username: "existingUser",
    email: "existing@test.com",
    birthDate: "2001-11-12",
    password: "Password1234",
    confirmPassword: "Password1234",
    publicInfo: "Test user info",
  },

  invalidPasswords: [
    { password: "abc", expectedError: "Minimum 6 characters" },
    { password: "12345", expectedError: "Minimum 6 characters" },
  ],

  validPassword: "Pass1234",
};

export default registrationData;
