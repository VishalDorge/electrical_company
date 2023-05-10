"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageModel = void 0;
const mongoose_1 = require("mongoose");
const base_schema_1 = require("../../utility/base.schema");
const imageSchema = new base_schema_1.BaseSchema({
    name: {
        type: String,
        default: "cat1"
    },
    img: {
        data: Buffer,
        contentType: String
    }
});
exports.imageModel = (0, mongoose_1.model)("Image", imageSchema);
