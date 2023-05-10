import { NextFunction, Request, Response, Router } from "express";
import { roleValidator } from "../../middleware/role.validate";
import { Roles } from "../role/role.data";
import { ResponseHandler } from "../../utility/response.handler";
import authServices from "../auth/auth.services";
import userServices from "./user.services";
import { CREATE_USER_VALIDATION, DELETE_USER_VALIDATION } from "./user.validate";

const router = Router();

router.get("/", roleValidator([Roles.ADMIN]), async (req, res, next) => {
    try {
        const result = await userServices.getAllEmployee();
        res.send(new ResponseHandler(result));
    } catch (err) {
        next(err);
    }
})

router.post("/", CREATE_USER_VALIDATION, roleValidator([Roles.ADMIN]), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const employee = req.body;
        const result = await authServices.register(employee);
        res.send(new ResponseHandler(result));
    } catch (err) {
        next(err);
    }
});

router.delete("/:employeeId", DELETE_USER_VALIDATION, roleValidator([Roles.ADMIN]), async (req:Request, res: Response, next: NextFunction) => {
    try {
        const {employeeId} = req.params;
        const result = await userServices.update({_id: employeeId}, {$set: {isDeleted: true}});
        res.send(new ResponseHandler(result));
    } catch (err) {
        next(err);
    }
})

export default router;