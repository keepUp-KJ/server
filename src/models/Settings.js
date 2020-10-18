import mongoose from mongoose;

const Scehma = mongoose.Scehma;

export const SettingsShema = new Scehma ({
    birthdayReminder: { 
        type :String,
        enum: ["On the same day", "One day before", "One week before", "None"],
    },
    callReminder:{ 
        type :String,
        enum: ["On the same day", "One day before", "One week before", "None"],
    },
    incompleteTaskReminder: { 
        type :String,
        enum: ["On the same day", "One day before", "One week before", "None"],
    },
    birthdayNotification: Boolean,
    dailyCallNotification: Boolean,
    incompleteTaskNotification: Boolean,
    userId:String,
    
})