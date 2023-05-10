import { NextFunction, Request, Response, Router } from "express";
import { IUser } from "../user/user.types";
import authServices from "./auth.services";
import { ResponseHandler } from "../../utility/response.handler";
import { roleValidator } from "../../middleware/role.validate";
import { Roles } from "../role/role.data";
import { validators } from "./auth.validate";

const router = Router();

router.post("/register", validators, roleValidator([Roles.ADMIN]), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user: IUser = req.body;
        const result = await authServices.register(user);
        res.send(new ResponseHandler(result));
    } catch (err) {
        next(err)
    }
});

router.post("/login", validators, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const credentials = req.body;
        const result = await authServices.login(credentials);
        res.send(new ResponseHandler(result));
    } catch (err) {
        next(err);
    }
})

export default router;