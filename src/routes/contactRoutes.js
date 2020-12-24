const { requireAuth } = require("../controllers/userController");
const {
  getContacts,
  editContact,
  setupAccount,
} = require("../controllers/contactController");

const routes = (app) => {
  app.route("/contacts").post(setupAccount);
  app.route("/users/:id/contacts").get(getContacts);
  app.route("/users/contacts").patch(editContact);
};

module.exports = routes;
