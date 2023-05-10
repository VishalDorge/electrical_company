import { FilterQuery, UpdateQuery } from "mongoose";
import { ICustomer, ICustomerCredentials } from "./customer.types";
import customerRepo from "./customer.repo";
import { CUSTOMER_RESPONSES } from "./customer.responses";
import billServices from "../bill/bill.services";
import userServices from "../user/user.services";

const find = (filter: FilterQuery<ICustomer>) => customerRepo.find(filter);
const findOne = (filter: FilterQuery<ICustomer>) => customerRepo.findOne(filter);
const update = (filter: FilterQuery<ICustomer>, data: UpdateQuery<ICustomer>) => customerRepo.update(filter, data);

const addCustomer = async (customerCredentials: ICustomerCredentials) => {
    try {
        const oldCustomer = await findOne({ email: customerCredentials.email });
        if (oldCustomer) throw CUSTOMER_RESPONSES.CUSTOMER_ALREADY_PRESENT
        const customer: ICustomer = {name: customerCredentials.name, email: customerCredentials.email, location: customerCredentials.location, meter: {meterType: customerCredentials.meterType}, employeeId: customerCredentials.employeeId}
        return customerRepo.create(customer);
    } catch (err) {
        throw {message: err}
    }
}

const findAll = async (typeOfMeters: string) => {
    let meterTypes = typeOfMeters.slice(1, typeOfMeters.length-1).split(",").filter(type => type.length>0);
    if(meterTypes.length === 0) meterTypes = ["1", "2", "3"];
    const filter = meterTypes.map(type => {return {"meter.meterType": Number(type)}});
    const allCustomers = await find({$or: filter});
    const result = [];
    for(let customer of allCustomers){
        const allBills = await billServices.find({customerId: customer._id});
        const lastMonthBill = allBills[allBills.length-1];
        const outstandingAmount = lastMonthBill?.isPaid === true ? 0 : lastMonthBill?.netAmount;
        
        const customerData = {
            customerId: customer._id,
            name: customer.name,
            meterType: customer.meter.meterType,
            lastMonthBill: lastMonthBill?.currentAmount || 0,
            totalOutstandingAmount: outstandingAmount || 0,
            location: customer.location
        }
        
        result.push(customerData);
    }
    return result;
}

const skipCustomer = async (customerId: string, reason: string) => {
    const customer = await findOne({_id: customerId});
    if(!customer) throw CUSTOMER_RESPONSES.CUSTOMER_NOT_FOUND;
    const result = await update({_id: customerId}, {$set: {isSkipped: {value: true, reason: reason}}});
    await userServices.update({_id: customer.employeeId}, {$inc: {noOfSkips: 1}});
    if(result.modifiedCount>0) return CUSTOMER_RESPONSES.CUSTOMER_SKIPPED;
    else throw CUSTOMER_RESPONSES.FAILURE;
}

const removeCustomer = async (customerId: string) => {
    const result = await update({_id: customerId}, {$set: {isDeleted: true}});
    const customerBills = await billServices.find({customerId});
    for(let bill of customerBills){
        await billServices.update({_id: bill._id}, {$set: {isDeleted: true}});
    }
    if(result.modifiedCount > 0) return CUSTOMER_RESPONSES.DELETED_SUCCESS;
    else return CUSTOMER_RESPONSES.FAILURE;
}

const getSkipCustomers = async () => find({"isSkipped.value": true}).select({name: 1, location: 1, employeeId: 1, "isSkipped.reason": 1});

export default {
    find, addCustomer, findOne, findAll, skipCustomer, getSkipCustomers, update, removeCustomer
}