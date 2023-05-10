"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const customer_services_1 = __importDefault(require("./customer.services"));
const response_handler_1 = require("../../utility/response.handler");
const role_data_1 = require("../role/role.data");
const role_validate_1 = require("../../middleware/role.validate");
const customer_validate_1 = require("./customer.validate");
const router = (0, express_1.Router)();
router.get("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let meterType = req.query.meterType;
        if (!meterType)
            meterType = "[]";
        const users = yield customer_services_1.default.findAll(meterType);
        res.send(new response_handler_1.ResponseHandler(users));
    }
    catch (err) {
        next(err);
    }
}));
router.post("/", customer_validate_1.CREATE_CUSTOMER_VALIDATION, (0, role_validate_1.roleValidator)([role_data_1.Roles.EMPLOYEE, role_data_1.Roles.ADMIN]), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customerCredentials = req.body;
        customerCredentials.employeeId = res.locals.payload.id;
        const result = yield customer_services_1.default.addCustomer(customerCredentials);
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (err) {
        next(err);
    }
}));
router.post("/skip", customer_validate_1.SKIP_CUSTOMER_VALIDATION, (0, role_validate_1.roleValidator)([role_data_1.Roles.EMPLOYEE]), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { customerId, reason } = req.body;
        const result = yield customer_services_1.default.skipCustomer(customerId, reason);
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (err) {
        next(err);
    }
}));
router.get("/skip", (0, role_validate_1.roleValidator)([role_data_1.Roles.ADMIN]), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield customer_services_1.default.getSkipCustomers();
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (err) {
        next(err);
    }
}));
router.delete("/:customerId", customer_validate_1.DELETE_CUSTOMER_VALIDATION, (0, role_validate_1.roleValidator)([role_data_1.Roles.ADMIN]), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { customerId } = req.params;
        const result = yield customer_services_1.default.removeCustomer(customerId);
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (err) {
        next(err);
    }
}));
exports.default = router;
