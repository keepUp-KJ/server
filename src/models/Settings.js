import mongoose from mongoose;

const Scehma = mongoose.Scehma;

export const SettingsShema = new Scehma ({
    birthday_reminder: String,
    call_reminder: String,
    incomplete_task_reminder: String,
    birthday_notification: Boolean,
    daily_call_notification: Boolean,
    incomplete_task_notification: Boolean,
    user_id:String,
    
})