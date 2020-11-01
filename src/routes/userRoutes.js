import {
  signup,
  login,
  updateSettings,
  verifyEmail,
  requireAuth,
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
    .get((req, res) => res.send("Settings request successful"))
    .patch(requireAuth, updateSettings);
};
export default routes;
