import { IBill } from "./bill.types";
import { billModel } from "./bill.schema";
import { FilterQuery, UpdateQuery } from "mongoose";

const create = (bill: IBill) => billModel.create(bill);
const find = (filter: Partial<IBill>) => billModel.find({...filter, isDeleted: false});
const findOne = (filter: FilterQuery<IBill>) => billModel.findOne({...filter, isDeleted: false});
const update = (filter: FilterQuery<IBill>, data: UpdateQuery<IBill>) => billModel.updateMany(filter, data);

export default{
    create, find, update, findOne
}