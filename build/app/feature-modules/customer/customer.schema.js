"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customerModel = void 0;
const mongoose_1 = require("mongoose");
const base_schema_1 = require("../../utility/base.schema");
const customerSchema = new base_schema_1.BaseSchema({
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
});
exports.customerModel = (0, mongoose_1.model)("Customer", customerSchema);
