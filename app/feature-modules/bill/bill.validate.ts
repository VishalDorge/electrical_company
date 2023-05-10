import { body, param } from "express-validator"
import { validate } from "../../utility/validate"

export const CREATE_BILL_VALIDATION = [
    body("meterId").isString().withMessage("Required MeterId"),
    body("currentUnits").isString().withMessage("Enter Correct Value for Current Units!"),
    validate
]

export const ACCEPT_BILL_VALIDATION = [
    param("billId").isString().isLength({min: 1, max: 24}).withMessage("Invalid BillId"),
    validate
]

export const DELETE_CUSTOMER_VALIDATION = [
    param("customerId").isString().isLength({min: 1}).withMessage("Invalid CustomerID"),
    validate
]