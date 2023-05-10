"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.excludedPaths = exports.routes = void 0;
const routes_types_1 = require("./routes.types");
const routes_index_1 = __importDefault(require("../feature-modules/routes.index"));
const token_validate_1 = require("../middleware/token.validate");
exports.routes = [
    new routes_types_1.Route("/auth", routes_index_1.default.AuthRouter),
    new routes_types_1.Route("/user", routes_index_1.default.UserRouter),
    new routes_types_1.Route("/bill", routes_index_1.default.BillRouter),
    new routes_types_1.Route("/customer", routes_index_1.default.CustomerRouter)
];
exports.excludedPaths = [
    new token_validate_1.ExcludedPath("/auth/login", "POST")
];
