const { requireAuth } = require("../controllers/userController");
const {
  getContacts,
  editContact,
  setupAccount,
  acceptContact,
  rejectContact,
} = require("../controllers/contactController");

const routes = (app) => {
  app.route("/contacts").post(setupAccount);
  app.route("/contacts/accept").post(requireAuth, acceptContact);
  app.route("/contacts/reject").post(requireAuth, rejectContact);
  app.route("/users/:id/contacts").get(requireAuth, getContacts);
  app.route("/users/contacts").patch(requireAuth, editContact);
};

module.exports = routes;
