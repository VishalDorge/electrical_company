import roleRepo from "./role.repo";
import { IRole } from "./role.types";

const create = (role: IRole) => roleRepo.create(role);
const findOne = (roleName: string) => roleRepo.findOne(roleName);

export default{
    create, findOne
}