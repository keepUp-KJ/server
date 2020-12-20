import { requireAuth } from "../controllers/userController";
import {
  addContact,
  getContacts,
  editContact,
} from "../controllers/contactController";

const routes = (app) => {
  app.route("/contacts").post(addContact);
  app.route("/users/:id/contacts").get(getContacts);
  app.route("/users/contacts").patch(editContact);
};

export default routes;
