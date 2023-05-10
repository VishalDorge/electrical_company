import { Application, NextFunction, Request, Response, json, static as st } from "express";
import { excludedPaths, routes } from "./routes.data";
import { ResponseHandler } from "../utility/response.handler";
import { tokenValidator } from "../middleware/token.validate";
import { urlencoded } from "body-parser";

export const registerRoutes = (app: Application) => {

    app.use(json())

    app.use(st("/upload"));

    app.use(tokenValidator(excludedPaths))

    app.use(urlencoded({extended: true}));

    for(let route of routes){
        app.use(route.path, route.router);
    }

    app.use((err: any, req: Request, res: Response, next: NextFunction) => {
        res.status(err.statusCode || 500).send(new ResponseHandler(null, err));
    })

}