const { requireAuth } = require("../controllers/userController");
const {
  addReminder,
  getReminders,
  markCompleted,
} = require("../controllers/reminderController");

const routes = (app) => {
  app.route("/reminders").post(requireAuth, addReminder);
  app.route("/reminders/:id").get(requireAuth, getReminders);
  app.route("/reminders/:id/completed").patch(requireAuth, markCompleted);
};
module.exports = routes;
