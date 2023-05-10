"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const customer_schema_1 = require("./customer.schema");
const create = (customer) => customer_schema_1.customerModel.create(customer);
const find = (filter) => customer_schema_1.customerModel.find(Object.assign({ isDeleted: false }, filter));
const findOne = (filter) => customer_schema_1.customerModel.findOne(filter);
const update = (filter, data) => customer_schema_1.customerModel.updateMany(filter, data);
exports.default = {
    find, create, findOne, update
};
