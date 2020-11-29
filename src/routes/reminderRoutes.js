import { requireAuth } from "../controllers/userController";
import {
  addReminder,
  getReminders,
  markCompleted,
  generateReminders,
} from "../controllers/reminderController";

const routes = (app) => {
  app.route("/reminders").post(addReminder).get(requireAuth, getReminders);
  app.route("/reminders/:id/completed").patch(requireAuth, markCompleted);
  app.route("/reminders/generate").post(generateReminders);
};
export default routes;
