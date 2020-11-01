import { requireAuth } from "../controllers/userController";
import {
  addReminder,
  getReminders,
  markCompleted,
} from "../controllers/reminderController";

const routes = (app) => {
  app.route("/reminders").post(addReminder).get(getReminders);
  app.route("/reminders/:id/completed").patch(markCompleted);
};
export default routes;
