import { Document, model } from "mongoose";
import { BaseSchema } from "../../utility/base.schema";
import { IRole } from "./role.types";

const roleSchema = new BaseSchema({

    _id: {
        type: String,
        required: true
    },

    name: {
        type: String,
        required: true
    }

});

export const roleModel = model<Document & IRole>("Role", roleSchema);