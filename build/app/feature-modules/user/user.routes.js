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
const role_validate_1 = require("../../middleware/role.validate");
const role_data_1 = require("../role/role.data");
const response_handler_1 = require("../../utility/response.handler");
const auth_services_1 = __importDefault(require("../auth/auth.services"));
const user_services_1 = __importDefault(require("./user.services"));
const user_validate_1 = require("./user.validate");
const router = (0, express_1.Router)();
router.get("/", (0, role_validate_1.roleValidator)([role_data_1.Roles.ADMIN]), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_services_1.default.getAllEmployee();
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (err) {
        next(err);
    }
}));
router.post("/", user_validate_1.CREATE_USER_VALIDATION, (0, role_validate_1.roleValidator)([role_data_1.Roles.ADMIN]), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const employee = req.body;
        const result = yield auth_services_1.default.register(employee);
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (err) {
        next(err);
    }
}));
router.delete("/:employeeId", user_validate_1.DELETE_USER_VALIDATION, (0, role_validate_1.roleValidator)([role_data_1.Roles.ADMIN]), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { employeeId } = req.params;
        const result = yield user_services_1.default.update({ _id: employeeId }, { $set: { isDeleted: true } });
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (err) {
        next(err);
    }
}));
exports.default = router;
