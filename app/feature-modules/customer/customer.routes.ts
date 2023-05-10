import { NextFunction, Request, Response, Router } from "express";
import customerServices from "./customer.services";
import { ResponseHandler } from "../../utility/response.handler";
import { Roles } from "../role/role.data";
import { roleValidator } from "../../middleware/role.validate";
import { CREATE_CUSTOMER_VALIDATION, DELETE_CUSTOMER_VALIDATION, SKIP_CUSTOMER_VALIDATION } from "./customer.validate";
const router = Router();

router.get("/", async (req, res, next) => {
    try {
        let meterType = req.query.meterType as string;
        if(!meterType) meterType = "[]";
        const users = await customerServices.findAll(meterType);
        res.send(new ResponseHandler(users));
    } catch (err) {
        next(err);
    }
})

router.post("/", CREATE_CUSTOMER_VALIDATION, roleValidator([Roles.EMPLOYEE, Roles.ADMIN]), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const customerCredentials = req.body;
        customerCredentials.employeeId = res.locals.payload.id;
        const result = await customerServices.addCustomer(customerCredentials);
        res.send(new ResponseHandler(result));
    } catch (err) {
        next(err);
    }
});

router.post("/skip", SKIP_CUSTOMER_VALIDATION, roleValidator([Roles.EMPLOYEE]), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {customerId, reason} = req.body;
        const result = await customerServices.skipCustomer(customerId, reason);
        res.send(new ResponseHandler(result));
    } catch (err) {
        next(err)
    }
})

router.get("/skip", roleValidator([Roles.ADMIN]), async (req, res, next) => {
    try {
        const result = await customerServices.getSkipCustomers();
        res.send(new ResponseHandler(result));
    } catch (err) {
        next(err);
    }
})

router.delete("/:customerId", DELETE_CUSTOMER_VALIDATION, roleValidator([Roles.ADMIN]), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {customerId} = req.params;
        const result = await customerServices.removeCustomer(customerId);
        res.send(new ResponseHandler(result));
    } catch (err) {
        next(err);
    }
})

export default router;