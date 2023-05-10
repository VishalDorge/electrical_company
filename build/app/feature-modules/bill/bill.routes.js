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
const bill_services_1 = __importDefault(require("./bill.services"));
const response_handler_1 = require("../../utility/response.handler");
const role_validate_1 = require("../../middleware/role.validate");
const role_data_1 = require("../role/role.data");
const bill_validate_1 = require("./bill.validate");
const upload_1 = require("../../middleware/upload");
const router = (0, express_1.Router)();
router.get("/", (0, role_validate_1.roleValidator)([role_data_1.Roles.ADMIN, role_data_1.Roles.EMPLOYEE]), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield bill_services_1.default.find({});
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (err) {
        next(err);
    }
}));
router.get("/proof", (0, role_validate_1.roleValidator)([role_data_1.Roles.ADMIN]), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const billId = req.body;
    }
    catch (err) {
        next(err);
    }
}));
router.get("/revenue", (0, role_validate_1.roleValidator)([role_data_1.Roles.ADMIN, role_data_1.Roles.EMPLOYEE]), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const startDate = req.query.startDate || "2000-01-01";
        const endDate = req.query.endDate || "3000-01-01";
        const result = yield bill_services_1.default.getTotalRevenue(startDate, endDate);
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (err) {
        next(err);
    }
}));
router.get("/outstanding", (0, role_validate_1.roleValidator)([role_data_1.Roles.ADMIN, role_data_1.Roles.EMPLOYEE]), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield bill_services_1.default.getOutStandingAmount();
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (err) {
        next(err);
    }
}));
router.patch("/:billId", bill_validate_1.ACCEPT_BILL_VALIDATION, (0, role_validate_1.roleValidator)([role_data_1.Roles.ADMIN, role_data_1.Roles.EMPLOYEE]), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const billId = req.params.billId;
        const result = yield bill_services_1.default.acceptBill(billId);
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (err) {
        next(err);
    }
}));
router.get("/average", (0, role_validate_1.roleValidator)([role_data_1.Roles.ADMIN, role_data_1.Roles.EMPLOYEE]), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield bill_services_1.default.getAverageBills();
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (err) {
        next(err);
    }
}));
router.post("/", (0, role_validate_1.roleValidator)([role_data_1.Roles.ADMIN, role_data_1.Roles.EMPLOYEE]), upload_1.upload.array("meterImage"), bill_validate_1.CREATE_BILL_VALIDATION, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const billCredentials = req.body;
        let meterImages = req.files;
        meterImages = meterImages === null || meterImages === void 0 ? void 0 : meterImages.map(e => e.filename + '.' + e.mimetype.split('/')[1]);
        const employeeId = res.locals.payload.id;
        const result = yield bill_services_1.default.generateBill(billCredentials, employeeId, meterImages);
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (err) {
        next(err);
    }
}));
exports.default = router;
