import mongoose from 'mongoose';


const Schema = mongoose.Schema;

export const ContactSchema = new Schema({
    firstName: {
        type: String,
        required: 'Enter First Name'
    },
    lastName: {
        type: String,
        required: 'Enter Last Name'
    },
    email: {
        type: String,
        required: 'Enter Email'
    }
});