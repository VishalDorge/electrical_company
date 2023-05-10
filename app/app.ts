import express from "express";
import { registerRoutes } from "./routes/routes";
import { connectToMongo } from "./connection/connection.mongo";

export const startServer = async () => {
    try {
        const app = express();
        await connectToMongo();
        registerRoutes(app);

        const { port } = process.env;
        
        app.listen(port, () => {
            console.log("server is listening on port : ", port);
        })

    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}