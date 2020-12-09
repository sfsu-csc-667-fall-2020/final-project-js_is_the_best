export const loginUser = user => ({
  type: "LOGIN",
  user
});

export const logoutUser = () => ({
  type: "LOGOUT"
});
