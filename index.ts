import { config } from "dotenv";
config();

// import { populateDb } from "./app/utility/populate.db";
// populateDb();

import { startServer } from "./app/app";
startServer();