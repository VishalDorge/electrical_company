import { FilterQuery, UpdateQuery } from "mongoose";
import userRepo from "./user.repo";
import { IUser } from "./user.types";
import { USER_RESPONSES } from "./user.responses";
import { Roles } from "../role/role.data";

const create = async (user: IUser) => {
    try {
        const oldUser = await findOne({email: user.email});
        if(oldUser) throw USER_RESPONSES.USER_ALREADY_EXIST;
        return userRepo.create({role: Roles.EMPLOYEE, ...user});
    } catch (err) { throw err }
}

const find = (filter: FilterQuery<IUser>) => userRepo.find(filter);
const update = async (filter: FilterQuery<IUser>, data: UpdateQuery<IUser>) => {
    const result = await userRepo.update(filter, data);
    if(result.modifiedCount > 0) return USER_RESPONSES.DELETED_SUCCESS;
    else throw USER_RESPONSES.FAILURE;
}
const findOne = (filter: FilterQuery<IUser>) => userRepo.findOne(filter);
const getAllEmployee = () => find({role: Roles.EMPLOYEE}).select({email: 1, noOfSkips: 1, noOfAttended: 1})

export default{
    create, findOne, update, find, getAllEmployee
}