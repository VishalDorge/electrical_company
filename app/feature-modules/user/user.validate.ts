import { body, param } from "express-validator"
import { validate } from "../../utility/validate"

export const CREATE_USER_VALIDATION = [
    body("password").isLength({min: 5}).withMessage("Give Strong Password"),
    body("email").isEmail().withMessage("Invalid Email!"),
    validate
]

export const SKIP_CUSTOMER_VALIDATION = [
    body("customerId").isString().isLength({min: 1, max: 24}).withMessage("Invalid CustomerId"),
    body("reason").isString().isLength({min: 1}).withMessage("Reason is Required!"),
    validate
]

export const DELETE_USER_VALIDATION = [
    param("employeeId").isString().isLength({min: 1}).withMessage("Invalid EmployeeID"),
    validate
]

