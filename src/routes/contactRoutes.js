import { requireAuth } from "../controllers/userController";
import { addContact } from "../controllers/contactController";

const routes = (app) => {
  app.route("/contacts").post(requireAuth, addContact);
};

export default routes;
