import { requireAuth } from "../controllers/userController";
import {
  getContacts,
  editContact,
  setupAccount,
} from "../controllers/contactController";

const routes = (app) => {
  app.route("/contacts").post(setupAccount);
  app.route("/users/:id/contacts").get(getContacts);
  app.route("/users/contacts").patch(editContact);
};

export default routes;
