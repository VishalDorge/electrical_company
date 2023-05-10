"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.billModel = void 0;
const mongoose_1 = require("mongoose");
const base_schema_1 = require("../../utility/base.schema");
const billSchema = new base_schema_1.BaseSchema({
    customerId: {
        type: String,
        required: true
    },
    customerEmail: {
        type: String,
        required: true
    },
    employeeId: {
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
});
exports.billModel = (0, mongoose_1.model)("Bill", billSchema);
