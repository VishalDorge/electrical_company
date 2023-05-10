"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExcludedPath = exports.tokenValidator = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const key_generate_1 = require("../utility/key.generate");
const tokenValidator = (excludedPaths) => (req, res, next) => {
    try {
        if (excludedPaths.find(e => {
            if (req.url.includes(e.url)) {
                if (e.excludeFromExcludePath.length === 0)
                    return true;
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
        const token = authorization === null || authorization === void 0 ? void 0 : authorization.split(" ")[1];
        if (!token)
            return next({ message: "Unauthorize", statusCode: 401 });
        const publicKey = (0, key_generate_1.getPublicKey)();
        const payload = (0, jsonwebtoken_1.verify)(token, publicKey || "");
        res.locals.payload = payload;
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.tokenValidator = tokenValidator;
class ExcludedPath {
    constructor(url, method, ...excludeFromExcludePath) {
        this.url = url;
        this.method = method;
        this.excludeFromExcludePath = [];
        this.excludeFromExcludePath = excludeFromExcludePath;
    }
}
exports.ExcludedPath = ExcludedPath;
