"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleValidator = void 0;
const roleValidator = (allowedRole) => {
    return (req, res, next) => {
        const { role } = res.locals.payload;
        if (allowedRole.includes(role))
            next();
        else
            next({ statusCode: 401, message: "ACCESS DENIED!!" });
    };
};
exports.roleValidator = roleValidator;
