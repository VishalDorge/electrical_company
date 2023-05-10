import { FilterQuery, UpdateQuery } from "mongoose";
import { ICustomer } from "./customer.types";
import { customerModel } from "./customer.schema";


const create = (customer: ICustomer) => customerModel.create(customer);
const find = (filter: FilterQuery<ICustomer>) => customerModel.find({isDeleted: false, ...filter});
const findOne = (filter: FilterQuery<ICustomer>) => customerModel.findOne(filter);
const update = (filter: FilterQuery<ICustomer>, data: UpdateQuery<ICustomer>) => customerModel.updateMany(filter, data);

export default{
    find, create, findOne, update
}