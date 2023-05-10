"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const role_repo_1 = __importDefault(require("./role.repo"));
const create = (role) => role_repo_1.default.create(role);
const findOne = (roleName) => role_repo_1.default.findOne(roleName);
exports.default = {
    create, findOne
};
