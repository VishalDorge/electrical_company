import {Request, Response, NextFunction, Router } from "express";
import { IBillCredentials } from "./bill.types";
import billServices from "./bill.services";
import { ResponseHandler } from "../../utility/response.handler";
import { roleValidator } from "../../middleware/role.validate";
import { Roles } from "../role/role.data";
import { ACCEPT_BILL_VALIDATION, CREATE_BILL_VALIDATION } from "./bill.validate";
import { upload } from "../../middleware/upload";

const router = Router();

router.get("/",roleValidator([Roles.ADMIN, Roles.EMPLOYEE]), async (req, res, next) => {
    try {
        const result = await billServices.find({});
        res.send(new ResponseHandler(result));
    } catch (err) {
        next(err);
    }
})

router.get("/proof", roleValidator([Roles.ADMIN]), async (req, res, next) => {
    try {
        const billId = req.body;
    } catch (err) {
        next(err);
    }
})

router.get("/revenue", roleValidator([Roles.ADMIN, Roles.EMPLOYEE]), async (req, res, next) => {
    try {
        const startDate = req.query.startDate as string || "2000-01-01"
        const endDate = req.query.endDate as string || "3000-01-01"
        const result = await billServices.getTotalRevenue(startDate, endDate);
        res.send(new ResponseHandler(result));
    } catch (err) {
        next(err);
    }
})

router.get("/outstanding", roleValidator([Roles.ADMIN, Roles.EMPLOYEE]), async (req, res, next) => {
    try {
        const result = await billServices.getOutStandingAmount();
        res.send(new ResponseHandler(result));
    } catch (err) {
        next(err);
    }
});

router.patch("/:billId", ACCEPT_BILL_VALIDATION, roleValidator([Roles.ADMIN, Roles.EMPLOYEE]), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const billId = req.params.billId;
        const result = await billServices.acceptBill(billId);
        res.send(new ResponseHandler(result));
    } catch (err) {
        next(err);
    }
})

router.get("/average", roleValidator([Roles.ADMIN, Roles.EMPLOYEE]), async (req, res, next) => {
    try {
        const result = await billServices.getAverageBills();
        res.send(new ResponseHandler(result));
    } catch (err) {
        next(err);
    }
})

router.post("/", roleValidator([Roles.ADMIN, Roles.EMPLOYEE]), upload.array("meterImage"), CREATE_BILL_VALIDATION, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const billCredentials: IBillCredentials = req.body;
        let meterImages = req.files as any[];
        meterImages = meterImages?.map( e => e.filename+'.'+e.mimetype.split('/')[1]);
        const employeeId = res.locals.payload.id as string;
        const result = await billServices.generateBill(billCredentials, employeeId, meterImages);
        res.send(new ResponseHandler(result));
    } catch (err) {
        next(err);
    }
})

export default router;