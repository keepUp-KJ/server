import { signup, login, updateSettings } from "../controllers/userController";

const routes = (app) => {
  app.route("/users").post(signup);
  app.route("/users/login").post(login);
  app
    .route("/users/verify-email")
    .post((req, res) => res.send("Verify request successful"));

  app
    .route("/users/forgot-password")
    .post((req, res) => res.send("Forgot request successful"));
  app
    .route("/users/:id/settings")
    .get((req, res) => res.send("Settings request successful"))
    .patch(updateSettings);
};
export default routes;
