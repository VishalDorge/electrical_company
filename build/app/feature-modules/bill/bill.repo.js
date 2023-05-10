"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bill_schema_1 = require("./bill.schema");
const create = (bill) => bill_schema_1.billModel.create(bill);
const find = (filter) => bill_schema_1.billModel.find(Object.assign(Object.assign({}, filter), { isDeleted: false }));
const findOne = (filter) => bill_schema_1.billModel.findOne(Object.assign(Object.assign({}, filter), { isDeleted: false }));
const update = (filter, data) => bill_schema_1.billModel.updateMany(filter, data);
exports.default = {
    create, find, update, findOne
};
