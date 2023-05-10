"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
// import { populateDb } from "./app/utility/populate.db";
// populateDb();
const app_1 = require("./app/app");
(0, app_1.startServer)();
