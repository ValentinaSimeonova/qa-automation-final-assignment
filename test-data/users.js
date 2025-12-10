export const testData = {
  validUser: {
    username: "existingUser",
    password: "Password1234",
  },
  invalidUsers: [
    {
      username: "nonexistentuser123",
      password: "wrongpass",
    },
    {
      username: "existingUser",
      password: "wrongpassword123",
    },
  ],
};

export default testData;
