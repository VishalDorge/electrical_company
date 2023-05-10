import { Document, model } from "mongoose";
import { BaseSchema } from "../../utility/base.schema";
import { IBill } from "./bill.types";

const billSchema = new BaseSchema({
    customerId: {
        type: String,
        required: true
    },

    customerEmail: {
        type: String,
        required: true
    },

    employeeId : {
        type: String,
        required: true
    },

    previousAmount: {
        type: Number,
        default: 0
    },

    currentAmount: {
        type: Number,
        required: true
    },

    netAmount: {
        type: Number,
        required: false,
    },

    customerLocation: {
        type: String,
        required: true
    },

    isPaid: {
        type: Boolean,
        default: false  
    },

    meterType: {
        type: Number,
        required: true
    },

    meterId: {
        type: String,
        required: true
    },

    meterImages: {
        type: [String],
        required: true
    }
})

export const billModel = model<Document & IBill>("Bill", billSchema);