import { NextFunction, Request, Response } from "express"

export const roleValidator = (allowedRole: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const {role} = res.locals.payload;
        if(allowedRole.includes(role)) next();
        else next({statusCode: 401, message: "ACCESS DENIED!!"});
    }
}