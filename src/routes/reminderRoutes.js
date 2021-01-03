const { requireAuth } = require("../controllers/userController");
const {
  addReminder,
  getReminders,
  markCompleted,
} = require("../controllers/reminderController");

const routes = (app) => {
  app.route("/reminders").post(addReminder);
  app.route("/reminders/:id").get(getReminders);
  app.route("/reminders/:id/completed").patch(markCompleted);
};
module.exports = routes;
