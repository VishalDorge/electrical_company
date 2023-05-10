"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DELETE_CUSTOMER_VALIDATION = exports.ACCEPT_BILL_VALIDATION = exports.CREATE_BILL_VALIDATION = void 0;
const express_validator_1 = require("express-validator");
const validate_1 = require("../../utility/validate");
exports.CREATE_BILL_VALIDATION = [
    (0, express_validator_1.body)("meterId").isString().withMessage("Required MeterId"),
    (0, express_validator_1.body)("currentUnits").isString().withMessage("Enter Correct Value for Current Units!"),
    validate_1.validate
];
exports.ACCEPT_BILL_VALIDATION = [
    (0, express_validator_1.param)("billId").isString().isLength({ min: 1, max: 24 }).withMessage("Invalid BillId"),
    validate_1.validate
];
exports.DELETE_CUSTOMER_VALIDATION = [
    (0, express_validator_1.param)("customerId").isString().isLength({ min: 1 }).withMessage("Invalid CustomerID"),
    validate_1.validate
];
