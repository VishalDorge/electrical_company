import { Document, model } from "mongoose";
import { BaseSchema } from "../../utility/base.schema";
import { IUser } from "./user.types";


const userSchema = new BaseSchema({

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        required: true
    },
    
    noOfSkips : {
        type: Number,
        default: 0
    },

    noOfAttended: {
        type: Number,
        default: 0
    }

})

export const userModel = model<Document & IUser>("User", userSchema);