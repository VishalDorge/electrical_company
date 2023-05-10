"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.numOfImages = exports.payPerUnits = void 0;
exports.payPerUnits = {
    NORMAL: 8,
    COMMERCIALS: 16,
    SOLAR: 4
};
const numOfImages = (meterType) => {
    if (meterType === 1)
        return 5;
    else if (meterType === 2)
        return 10;
    else
        return 5;
};
exports.numOfImages = numOfImages;
