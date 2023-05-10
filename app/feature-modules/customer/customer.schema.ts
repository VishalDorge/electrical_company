import { Document, model } from "mongoose";
import { BaseSchema } from "../../utility/base.schema";
import { ICustomer } from "./customer.types";

const customerSchema = new BaseSchema({

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    location: {
        type: String,
        required: true
    },

    employeeId: {
        type: String,
        required: true
    },
    
    meter: {
        type: {
            meterType: Number,
            pricePerUnit: Number
        }, 
        required: true
    },

    meterId: {
        type: String,
        required: false
    },

    isSkipped: {
        type: {
            value: Boolean,
            reason: String
        },
        default: {
            value: false,
            reason: null
        }
    }

})

export const customerModel = model<Document & ICustomer>("Customer", customerSchema);