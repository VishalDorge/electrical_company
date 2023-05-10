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
const customer_repo_1 = __importDefault(require("./customer.repo"));
const customer_responses_1 = require("./customer.responses");
const bill_services_1 = __importDefault(require("../bill/bill.services"));
const user_services_1 = __importDefault(require("../user/user.services"));
const find = (filter) => customer_repo_1.default.find(filter);
const findOne = (filter) => customer_repo_1.default.findOne(filter);
const update = (filter, data) => customer_repo_1.default.update(filter, data);
const addCustomer = (customerCredentials) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const oldCustomer = yield findOne({ email: customerCredentials.email });
        if (oldCustomer)
            throw customer_responses_1.CUSTOMER_RESPONSES.CUSTOMER_ALREADY_PRESENT;
        const customer = { name: customerCredentials.name, email: customerCredentials.email, location: customerCredentials.location, meter: { meterType: customerCredentials.meterType }, employeeId: customerCredentials.employeeId };
        return customer_repo_1.default.create(customer);
    }
    catch (err) {
        throw { message: err };
    }
});
const findAll = (typeOfMeters) => __awaiter(void 0, void 0, void 0, function* () {
    let meterTypes = typeOfMeters.slice(1, typeOfMeters.length - 1).split(",").filter(type => type.length > 0);
    if (meterTypes.length === 0)
        meterTypes = ["1", "2", "3"];
    const filter = meterTypes.map(type => { return { "meter.meterType": Number(type) }; });
    const allCustomers = yield find({ $or: filter });
    const result = [];
    for (let customer of allCustomers) {
        const allBills = yield bill_services_1.default.find({ customerId: customer._id });
        const lastMonthBill = allBills[allBills.length - 1];
        const outstandingAmount = (lastMonthBill === null || lastMonthBill === void 0 ? void 0 : lastMonthBill.isPaid) === true ? 0 : lastMonthBill === null || lastMonthBill === void 0 ? void 0 : lastMonthBill.netAmount;
        const customerData = {
            customerId: customer._id,
            name: customer.name,
            meterType: customer.meter.meterType,
            lastMonthBill: (lastMonthBill === null || lastMonthBill === void 0 ? void 0 : lastMonthBill.currentAmount) || 0,
            totalOutstandingAmount: outstandingAmount || 0,
            location: customer.location
        };
        result.push(customerData);
    }
    return result;
});
const skipCustomer = (customerId, reason) => __awaiter(void 0, void 0, void 0, function* () {
    const customer = yield findOne({ _id: customerId });
    if (!customer)
        throw customer_responses_1.CUSTOMER_RESPONSES.CUSTOMER_NOT_FOUND;
    const result = yield update({ _id: customerId }, { $set: { isSkipped: { value: true, reason: reason } } });
    yield user_services_1.default.update({ _id: customer.employeeId }, { $inc: { noOfSkips: 1 } });
    if (result.modifiedCount > 0)
        return customer_responses_1.CUSTOMER_RESPONSES.CUSTOMER_SKIPPED;
    else
        throw customer_responses_1.CUSTOMER_RESPONSES.FAILURE;
});
const removeCustomer = (customerId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield update({ _id: customerId }, { $set: { isDeleted: true } });
    const customerBills = yield bill_services_1.default.find({ customerId });
    for (let bill of customerBills) {
        yield bill_services_1.default.update({ _id: bill._id }, { $set: { isDeleted: true } });
    }
    if (result.modifiedCount > 0)
        return customer_responses_1.CUSTOMER_RESPONSES.DELETED_SUCCESS;
    else
        return customer_responses_1.CUSTOMER_RESPONSES.FAILURE;
});
const getSkipCustomers = () => __awaiter(void 0, void 0, void 0, function* () { return find({ "isSkipped.value": true }).select({ name: 1, location: 1, employeeId: 1, "isSkipped.reason": 1 }); });
exports.default = {
    find, addCustomer, findOne, findAll, skipCustomer, getSkipCustomers, update, removeCustomer
};
