const login = () => {
  window.Clerk.openSignIn();
};

const registration = () => {
  window.Clerk.openSignUp();
};

const userApi = { login, registration };

export default userApi;
