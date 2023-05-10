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
const user_repo_1 = __importDefault(require("./user.repo"));
const user_responses_1 = require("./user.responses");
const role_data_1 = require("../role/role.data");
const create = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const oldUser = yield findOne({ email: user.email });
        if (oldUser)
            throw user_responses_1.USER_RESPONSES.USER_ALREADY_EXIST;
        return user_repo_1.default.create(Object.assign({ role: role_data_1.Roles.EMPLOYEE }, user));
    }
    catch (err) {
        throw err;
    }
});
const find = (filter) => user_repo_1.default.find(filter);
const update = (filter, data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_repo_1.default.update(filter, data);
    if (result.modifiedCount > 0)
        return user_responses_1.USER_RESPONSES.DELETED_SUCCESS;
    else
        throw user_responses_1.USER_RESPONSES.FAILURE;
});
const findOne = (filter) => user_repo_1.default.findOne(filter);
const getAllEmployee = () => find({ role: role_data_1.Roles.EMPLOYEE }).select({ email: 1, noOfSkips: 1, noOfAttended: 1 });
exports.default = {
    create, findOne, update, find, getAllEmployee
};
