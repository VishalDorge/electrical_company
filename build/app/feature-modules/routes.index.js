"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_routes_1 = __importDefault(require("./user/user.routes"));
const auth_routes_1 = __importDefault(require("./auth/auth.routes"));
const bill_routes_1 = __importDefault(require("./bill/bill.routes"));
const customer_routes_1 = __importDefault(require("./customer/customer.routes"));
exports.default = {
    UserRouter: user_routes_1.default, AuthRouter: auth_routes_1.default, BillRouter: bill_routes_1.default, CustomerRouter: customer_routes_1.default
};
