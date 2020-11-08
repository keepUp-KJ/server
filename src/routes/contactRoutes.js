import { requireAuth } from "../controllers/userController";
import { addContact, getContacts } from "../controllers/contactController";

const routes = (app) => {
  app.route("/contacts").post(addContact).get(getContacts);
};

export default routes;
