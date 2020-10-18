import { requireAuth } from "../controllers/userController";
import { addContact, getContacts } from "../controllers/contactController";

const routes = (app) => {
  app
    .route("/contacts")
    .post(requireAuth, addContact)
    .get(requireAuth, getContacts);
};

export default routes;
