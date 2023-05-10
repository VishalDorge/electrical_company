
export interface IBill {
    _id?: string,
    customerId: string;
    customerEmail: string;
    customerLocation: string;
    previousAmount: number;
    currentAmount: number;
    netAmount: number;
    meterType: number;
    employeeId: string;
    isPaid?: boolean;
}

export interface IBillCredentials {
    meterId: string;
    currentUnits: number;
}