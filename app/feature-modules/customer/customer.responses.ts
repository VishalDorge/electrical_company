
export const CUSTOMER_RESPONSES = {

    CUSTOMER_ALREADY_PRESENT : {
        statusCode: 400,
        message: "Customer already Present!"
    },

    CUSTOMER_NOT_FOUND : {
        statusCode: 400,
        message: "Invalid Customer Credentials!"
    },

    CUSTOMER_SKIPPED : {
        statusCode: 200,
        message: "Customer is Skipped!"
    },

    FAILURE : {
        statusCode: 400,
        message: "Unable to proceed your request!"
    },

    DELETED_SUCCESS : {
        statusCode: 200,
        message: "Customer Deleted Successfully!"
    }

}