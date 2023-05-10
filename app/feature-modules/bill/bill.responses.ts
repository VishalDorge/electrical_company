
export const BILL_RESPONSES = {
    INVALID_CUSTOMER : {
        statusCode: 400,
        message: "Invalid Customer Credentials"
    },

    BILL_PAID_SUCCESS : {
        statusCode: 200,
        message: "Bill Paid Successfully!"
    },

    BILL_PAID_FAILURE : {
        statusCode: 400,
        message: "Unable to Proceed your Request!"
    },

    INVALID_BILL_ID : {
        statusCode: 400,
        message: "Invalid or Expired Bill! Updated Bill Required!"
    },

    ALREADY_PAID : {
        statusCode: 400,
        message: "Bill is Already Paid!"
    }
}