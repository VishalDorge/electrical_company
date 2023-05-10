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
const bill_repo_1 = __importDefault(require("./bill.repo"));
const bill_responses_1 = require("./bill.responses");
const customer_data_1 = require("../customer/customer.data");
const customer_services_1 = __importDefault(require("../customer/customer.services"));
const user_services_1 = __importDefault(require("../user/user.services"));
const bill_data_1 = require("./bill.data");
const getCurrentBill = (currentUnits, meterType) => {
    if (meterType === customer_data_1.MeterType.NORMAL) {
        return currentUnits * bill_data_1.payPerUnits.NORMAL;
    }
    else if (meterType === customer_data_1.MeterType.COMMERCIAL) {
        return currentUnits * bill_data_1.payPerUnits.COMMERCIALS;
    }
    else {
        return currentUnits * bill_data_1.payPerUnits.SOLAR;
    }
};
const updatedingPreviousBill = (customerId) => __awaiter(void 0, void 0, void 0, function* () {
    const oldBill = yield findOne({ customerId: customerId });
    if (!oldBill || oldBill.isPaid)
        return 0;
    yield bill_repo_1.default.update({ customerId: customerId }, { $set: { isDeleted: true } });
    if (!oldBill.isPaid)
        return oldBill.netAmount;
    else
        return 0;
});
const generateBill = (billCredentials, employeeId, meterImages) => __awaiter(void 0, void 0, void 0, function* () {
    const customer = yield customer_services_1.default.findOne({ "meter._id": billCredentials.meterId });
    if (!customer)
        throw bill_responses_1.BILL_RESPONSES.INVALID_CUSTOMER;
    const currentBill = getCurrentBill(billCredentials.currentUnits, customer.meter.meterType);
    const previoudBill = yield updatedingPreviousBill(customer._id);
    const bill = Object.assign(Object.assign({}, billCredentials), { employeeId: employeeId, customerId: customer._id, customerEmail: customer.email, customerLocation: customer.location, previousAmount: previoudBill, currentAmount: currentBill, netAmount: previoudBill + currentBill, meterType: customer.meter.meterType, meterId: customer.meter._id, meterImages: meterImages });
    const result = bill_repo_1.default.create(bill);
    yield user_services_1.default.update({ _id: employeeId }, { $inc: { noOfAttended: 1 } });
    return result;
});
const acceptBill = (billId) => __awaiter(void 0, void 0, void 0, function* () {
    const bill = yield findOne({ _id: billId });
    if (!bill)
        throw bill_responses_1.BILL_RESPONSES.INVALID_BILL_ID;
    if (bill.isPaid)
        throw bill_responses_1.BILL_RESPONSES.ALREADY_PAID;
    const result = yield update({ _id: billId }, { $set: { isPaid: true } });
    if (result.modifiedCount > 0)
        return bill_responses_1.BILL_RESPONSES.BILL_PAID_SUCCESS;
    else
        throw bill_responses_1.BILL_RESPONSES.BILL_PAID_FAILURE;
});
const find = (filter) => bill_repo_1.default.find(filter);
const findOne = (filter) => bill_repo_1.default.findOne(filter);
const update = (filter, data) => bill_repo_1.default.update(filter, data);
const averageMaker = (setOfBills) => {
    const totalBill = setOfBills.reduce((sum, currentBill) => {
        return sum + currentBill.netAmount;
    }, 0);
    return totalBill / setOfBills.length;
};
const getAverageBills = () => __awaiter(void 0, void 0, void 0, function* () {
    const allBills = yield find({});
    const normalMeterBills = allBills.filter(bill => bill.meterType === customer_data_1.MeterType.NORMAL);
    const commercialMeterBills = allBills.filter(bill => bill.meterType === customer_data_1.MeterType.COMMERCIAL);
    const solarMeterBills = allBills.filter(bill => bill.meterType === customer_data_1.MeterType.SOLAR);
    const averageNormalBill = averageMaker(normalMeterBills);
    const averageCommercialBill = averageMaker(commercialMeterBills);
    const averageSolarBill = averageMaker(solarMeterBills);
    return { averageNormalBill, averageCommercialBill, averageSolarBill };
});
const getOutStandingAmount = () => __awaiter(void 0, void 0, void 0, function* () {
    const allOutstandingBills = yield find({ isPaid: false });
    const totalOutstandingAmount = allOutstandingBills.reduce((sum, currentBill) => {
        return sum + currentBill.netAmount;
    }, 0);
    const userWiseOutstandingAmount = allOutstandingBills.map(bill => {
        return { customerId: bill.customerId, outStandingAmount: bill.netAmount };
    });
    return { totalOutstandingAmount, userWiseOutstandingAmount };
});
const getTotalRevenue = (startDate, endDate) => __awaiter(void 0, void 0, void 0, function* () {
    const allBills = yield find({ isPaid: true, createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) } });
    const revenue = allBills.reduce((sum, currentBill) => sum + currentBill.netAmount, 0);
    return { totalRevenue: revenue };
});
exports.default = {
    generateBill, find, findOne, getAverageBills, getOutStandingAmount, update, acceptBill, getTotalRevenue
};
