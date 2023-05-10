import { FilterQuery, UpdateQuery } from "mongoose";
import { userModel } from "./user.schema";
import { IUser } from "./user.types";

const create = (user: IUser) => userModel.create(user);
const find = (filter: FilterQuery<IUser>) => userModel.find({...filter, isDeleted: false});
const update = (filter: FilterQuery<IUser>, data: UpdateQuery<IUser>) => userModel.updateMany(filter, data); 
const findOne = (filter: FilterQuery<IUser>) => userModel.findOne(filter);

export default{
    create, find, update, findOne
}