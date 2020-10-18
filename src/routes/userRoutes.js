import { signup, login } from "../controllers/userController";

const routes = (app) => {
  app.route("/users").post(signup);

  app.route("/users/login").post(login);
};

export default routes;
