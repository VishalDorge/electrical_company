 import { FilterQuery, UpdateQuery } from "mongoose";
import billRepo from "./bill.repo";
import { IBill, IBillCredentials } from "./bill.types";
import { BILL_RESPONSES } from "./bill.responses";
import { MeterType} from "../customer/customer.data"
import customerServices from "../customer/customer.services";
import userServices from "../user/user.services";
import { payPerUnits } from "./bill.data";

const getCurrentBill = (currentUnits: number, meterType: number) => {
    if(meterType === MeterType.NORMAL){
        return currentUnits * payPerUnits.NORMAL;
    }else if(meterType === MeterType.COMMERCIAL){
        return currentUnits * payPerUnits.COMMERCIALS;
    }else{
        return currentUnits * payPerUnits.SOLAR;
    }
}

const updatedingPreviousBill = async (customerId: string) => {
    const oldBill = await findOne({customerId: customerId});
    if(!oldBill || oldBill.isPaid) return 0;
    await billRepo.update({customerId: customerId}, {$set: {isDeleted: true}});
    if(!oldBill.isPaid) return oldBill.netAmount;
    else return 0;
}

const generateBill = async (billCredentials: IBillCredentials, employeeId: string, meterImages: string[]) => {
    const customer = await customerServices.findOne({"meter._id": billCredentials.meterId});
    if(!customer) throw BILL_RESPONSES.INVALID_CUSTOMER;
    const currentBill = getCurrentBill(billCredentials.currentUnits, customer.meter.meterType);
    const previoudBill = await updatedingPreviousBill(customer._id);
    
    const bill = {...billCredentials,
        employeeId: employeeId,
        customerId: customer._id,
        customerEmail: customer.email,
        customerLocation: customer.location,
        previousAmount: previoudBill,
        currentAmount: currentBill,
        netAmount: previoudBill + currentBill,
        meterType: customer.meter.meterType,
        meterId: customer.meter._id,
        meterImages: meterImages
    }
    const result = billRepo.create(bill);
    await userServices.update({_id: employeeId}, {$inc: {noOfAttended: 1}});
    return result;
}

const acceptBill = async (billId: string) => {
    const bill = await findOne({_id: billId});
    if(!bill) throw BILL_RESPONSES.INVALID_BILL_ID;
    if(bill.isPaid) throw BILL_RESPONSES.ALREADY_PAID;
    const result = await update({_id: billId}, {$set: {isPaid: true}});
    if(result.modifiedCount > 0) return BILL_RESPONSES.BILL_PAID_SUCCESS;
    else throw BILL_RESPONSES.BILL_PAID_FAILURE;
}

const find = (filter: FilterQuery<IBill>) => billRepo.find(filter);
const findOne = (filter: FilterQuery<IBill>) => billRepo.findOne(filter);
const update = (filter: FilterQuery<IBill>, data: UpdateQuery<IBill>) => billRepo.update(filter, data);

const averageMaker = (setOfBills: IBill[]) => {
    const totalBill = setOfBills.reduce((sum, currentBill) => {
        return sum + currentBill.netAmount;
    }, 0)
    return totalBill / setOfBills.length;
}

const getAverageBills = async () => {
    const allBills = await find({});
    
    const normalMeterBills = allBills.filter(bill => bill.meterType === MeterType.NORMAL);
    const commercialMeterBills = allBills.filter(bill => bill.meterType === MeterType.COMMERCIAL);
    const solarMeterBills = allBills.filter(bill => bill.meterType === MeterType.SOLAR);

    const averageNormalBill = averageMaker(normalMeterBills);
    const averageCommercialBill = averageMaker(commercialMeterBills);
    const averageSolarBill = averageMaker(solarMeterBills);

    return {averageNormalBill, averageCommercialBill, averageSolarBill}
}

const getOutStandingAmount = async () => {
    const allOutstandingBills = await find({isPaid: false});
    const totalOutstandingAmount = allOutstandingBills.reduce((sum, currentBill) => {
        return sum + currentBill.netAmount;
    }, 0);
    const userWiseOutstandingAmount = allOutstandingBills.map(bill => {
        return {customerId: bill.customerId, outStandingAmount: bill.netAmount};
    })
    return {totalOutstandingAmount, userWiseOutstandingAmount};
}

const getTotalRevenue = async (startDate: string, endDate: string) => {
    const allBills = await find({isPaid: true, createdAt: {$gte: new Date(startDate), $lte: new Date(endDate)}});
    const revenue = allBills.reduce((sum, currentBill) => sum + currentBill.netAmount, 0);
    return {totalRevenue: revenue};
}


export default{
    generateBill, find, findOne, getAverageBills, getOutStandingAmount, update, acceptBill, getTotalRevenue
}