import authServices from "../feature-modules/auth/auth.services"
import { adminData } from "./constants"


export const populateDb = () => {
    adminData.forEach(admin => authServices.register(admin));   
}