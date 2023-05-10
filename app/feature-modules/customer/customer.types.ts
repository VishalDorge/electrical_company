
export interface ICustomerCredentials{
    _id? : string;
    name : string;
    email: string;
    location: string;
    meterType: number;
    employeeId: string;
}

export interface ICustomer{
    name: string;
    email: string;
    location: string;
    meter: Meter,
    employeeId: string;
}

type Meter = {
    _id?: string;
    meterType: number;
}