"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DELETE_CUSTOMER_VALIDATION = exports.SKIP_CUSTOMER_VALIDATION = exports.CREATE_CUSTOMER_VALIDATION = void 0;
const express_validator_1 = require("express-validator");
const validate_1 = require("../../utility/validate");
exports.CREATE_CUSTOMER_VALIDATION = [
    (0, express_validator_1.body)("name").isString().isLength({ min: 1 }).withMessage("Name Required!"),
    (0, express_validator_1.body)("location").isString().isLength({ min: 1 }).withMessage("Location Required!"),
    (0, express_validator_1.body)("meterType").isNumeric().withMessage("MeterType Required!"),
    (0, express_validator_1.body)("email").isEmail().withMessage("Invalid Email!"),
    validate_1.validate
];
exports.SKIP_CUSTOMER_VALIDATION = [
    (0, express_validator_1.body)("customerId").isString().isLength({ min: 1, max: 24 }).withMessage("Invalid CustomerId"),
    (0, express_validator_1.body)("reason").isString().isLength({ min: 1 }).withMessage("Reason is Required!"),
    validate_1.validate
];
exports.DELETE_CUSTOMER_VALIDATION = [
    (0, express_validator_1.param)("customerId").isString().isLength({ min: 1 }).withMessage("Invalid CustomerID"),
    validate_1.validate
];
