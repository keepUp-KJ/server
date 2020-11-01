import { requireAuth } from "../controllers/userController";
import {
  addReminder,
  getReminders,
  markCompleted,
} from "../controllers/reminderController";

const routes = (app) => {
  app
    .route("/reminders")
    .post(requireAuth, addReminder)
    .get(requireAuth, getReminders);
  app.route("/reminders/:id/completed").patch(requireAuth, markCompleted);
};
export default routes;
