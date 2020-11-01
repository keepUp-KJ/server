import {
  signup,
  login,
  updateSettings,
  verifyEmail,
  requireAuth,
  getUserSettings,
} from "../controllers/userController";

const routes = (app) => {
  app.route("/users").post(signup);
  app.route("/users/login").post(login);
  app.route("/users/verify-email").post(verifyEmail);
  app
    .route("/users/forgot-password")
    .post((req, res) => res.send("Forgot request successful"));
  app
    .route("/users/:id/settings")
    .patch(requireAuth, updateSettings)
    .get(requireAuth, getUserSettings);
};
export default routes;
