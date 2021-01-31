const { requireAuth } = require("../controllers/userController");
const {
  getContacts,
  editContact,
  setupAccount,
  acceptContact,
  rejectContact,
  removeFromBlackList,
} = require("../controllers/contactController");

const routes = (app) => {
  app.route("/contacts").post(setupAccount);
  app.route("/contacts/accept").post(requireAuth, acceptContact);
  app.route("/contacts/reject").post(requireAuth, rejectContact);
  app.route("/users/:id/contacts").get(requireAuth, getContacts);
  app.route("/users/contacts").patch(requireAuth, editContact);
  app.route("/contacts/:id/remove").delete(requireAuth, removeFromBlackList);
};

module.exports = routes;
