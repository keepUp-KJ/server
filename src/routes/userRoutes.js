import {
  signup,
  login,
  updateSettings,
  verifyEmail,
  requireAuth,
  getUserSettings,
  forgotPassword,
  renewPassword,
} from "../controllers/userController";

const routes = (app) => {
  app.route("/users").post(signup);
  app.route("/users/login").post(login);
  app.route("/users/verify-email").post(verifyEmail);
  app.route("/users/forgot-password").post(forgotPassword);
  app.route("/users/renew-password").patch(renewPassword);
  app.route("/users/:id/settings").patch(updateSettings).get(getUserSettings);
};
export default routes;
