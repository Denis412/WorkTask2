const get = () => window.Clerk.user;

const login = () => {
  window.Clerk.openSignIn();
};

const registration = () => {
  window.Clerk.openSignUp();
};

const userApi = { get, login, registration };

export default userApi;
