import { requireAuth } from "../controllers/userController";
import { addReminder, getReminders } from "../controllers/reminderController";

const routes = (app) => {
  app.route("/reminders").post(addReminder).get(getReminders);
  app
    .route("/reminders/:reminderId/mark_completed")
    .put((req, res) => res.send("Put reminder request successful"));
};
export default routes;
