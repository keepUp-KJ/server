import { requireAuth } from "../controllers/userController";
import { addContact, getContacts } from "../controllers/contactController";

const routes = (app) => {
  app.route("/contacts").post(addContact);
  app.route("/users/:id/contacts").get(getContacts);
};

export default routes;
