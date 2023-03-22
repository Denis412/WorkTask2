const login = () => {
  window.Clerk.openSignIn();
};

const registration = () => {};

const userApi = { login, registration };

export default userApi;
