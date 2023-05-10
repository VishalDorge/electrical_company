import { body, param } from "express-validator"
import { validate } from "../../utility/validate"

export const CREATE_CUSTOMER_VALIDATION = [
    body("name").isString().isLength({min: 1}).withMessage("Name Required!"),
    body("location").isString().isLength({min: 1}).withMessage("Location Required!"),
    body("meterType").isNumeric().withMessage("MeterType Required!"),
    body("email").isEmail().withMessage("Invalid Email!"),
    validate
]

export const SKIP_CUSTOMER_VALIDATION = [
    body("customerId").isString().isLength({min: 1, max: 24}).withMessage("Invalid CustomerId"),
    body("reason").isString().isLength({min: 1}).withMessage("Reason is Required!"),
    validate
]

export const DELETE_CUSTOMER_VALIDATION = [
    param("customerId").isString().isLength({min: 1}).withMessage("Invalid CustomerID"),
    validate
]

