import { signup } from "../controllers/userController";

const routes = (app) => {
  app.route("/").post(signup);

  app.route("/login").post((req, res) => res.send("Login request successful"));
};

export default routes;
