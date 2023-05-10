"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const image_services_1 = require("./image.services");
const fs_1 = __importDefault(require("fs"));
const image_schema_1 = require("./image.schema");
const response_handler_1 = require("../../utility/response.handler");
const router = (0, express_1.Router)();
router.post("/upload", (req, res, next) => {
    res.send("coming here");
});
router.post("/upload", image_services_1.upload.single("meter"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        console.log(req.file);
        const img = fs_1.default.readFileSync(((_a = req.file) === null || _a === void 0 ? void 0 : _a.path) || "");
        const encodedImg = img.toString("base64");
        const finalImg = {
            contentType: (_b = req.file) === null || _b === void 0 ? void 0 : _b.mimetype,
            image: new Buffer(encodedImg, "base64")
        };
        const result = yield image_schema_1.imageModel.create({ name: File.name, img: finalImg });
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (err) {
        console.log(err);
        next(err);
    }
}));
exports.default = router;
