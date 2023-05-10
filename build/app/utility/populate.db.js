"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.populateDb = void 0;
const auth_services_1 = __importDefault(require("../feature-modules/auth/auth.services"));
const constants_1 = require("./constants");
const populateDb = () => {
    constants_1.adminData.forEach(admin => auth_services_1.default.register(admin));
};
exports.populateDb = populateDb;
