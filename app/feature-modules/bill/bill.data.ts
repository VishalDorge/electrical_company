

export const payPerUnits = {
    NORMAL : 8,
    COMMERCIALS: 16,
    SOLAR: 4
}

export const numOfImages = (meterType: number) => {
    if(meterType === 1) return 5;
    else if(meterType === 2) return 10;
    else return 5;
}