"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_schema_1 = require("./user.schema");
const create = (user) => user_schema_1.userModel.create(user);
const find = (filter) => user_schema_1.userModel.find(Object.assign(Object.assign({}, filter), { isDeleted: false }));
const update = (filter, data) => user_schema_1.userModel.updateMany(filter, data);
const findOne = (filter) => user_schema_1.userModel.findOne(filter);
exports.default = {
    create, find, update, findOne
};
