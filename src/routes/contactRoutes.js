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
  app.route("/contacts/accept").post(acceptContact);
  app.route("/contacts/reject").post(rejectContact);
  app.route("/users/:id/contacts").get(getContacts);
  app.route("/users/contacts").patch(editContact);
};

module.exports = routes;
