import {
  signup,
  login,
  updateSettings,
  getUserSettings,
} from "../controllers/userController";

const routes = (app) => {
  app.route("/users").post(signup);
  app.route("/users/login").post(login);
  app
    .route("/users/verify-email")
    .post((req, res) => res.send("Verify request successful"));

  app
    .route("/users/forgot-password")
    .post((req, res) => res.send("Forgot request successful"));
  app.route("/users/:id/settings").get(getUserSettings).patch(updateSettings);
};
export default routes;
