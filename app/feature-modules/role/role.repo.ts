import { roleModel } from "./role.schema";
import { IRole } from "./role.types";


const create = (role: IRole) => roleModel.create(role);
const findOne = (roleName: string) => roleModel.findOne({name: roleName});

export default{
    create, findOne
}