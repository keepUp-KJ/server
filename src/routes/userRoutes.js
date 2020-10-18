import { signup, login } from "../controllers/userController";

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
    .route("/users/:user-id/settings")
    .get((req, res) => res.send("Settings request successful"));
};
export default routes;
