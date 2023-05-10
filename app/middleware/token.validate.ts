import { NextFunction, Request, Response } from "express";
import { JwtPayload, verify } from "jsonwebtoken";
import { getPublicKey } from "../utility/key.generate";

export const tokenValidator = (excludedPaths: ExcludedPath[]) => (req: Request, res: Response, next: NextFunction) => {
    try {
        if (excludedPaths.find(e => {
            if (req.url.includes(e.url)) {
                if(e.excludeFromExcludePath.length === 0) return true;
                const params = req.url.replace(e.url, "").split("/").slice(1);
                for (let arr of e.excludeFromExcludePath) {
                    if (JSON.stringify(params) === JSON.stringify(arr)) {
                        return true;
                    }
                }
            }
        })) {
            return next();
        }

        const { authorization } = req.headers;
        const token = authorization?.split(" ")[1];
        if (!token) return next({ message: "Unauthorize", statusCode: 401 });
        const publicKey = getPublicKey();
        const payload = verify(token, publicKey || "") as JwtPayload;
        res.locals.payload = payload;
        next();

    } catch (error) {
        next(error);
    }
}

type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE"

export class ExcludedPath {
    excludeFromExcludePath: string[][] = [];
    constructor(public url: string, public method: Method, ...excludeFromExcludePath: string[][]) {
        this.excludeFromExcludePath = excludeFromExcludePath;
    }
}