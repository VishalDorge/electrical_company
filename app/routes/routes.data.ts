import { Route } from "./routes.types"
import Routers from "../feature-modules/routes.index"
import { ExcludedPath } from "../middleware/token.validate"

export const routes: Route[] = [
    new Route("/auth", Routers.AuthRouter),
    new Route("/user", Routers.UserRouter),
    new Route("/bill", Routers.BillRouter),
    new Route("/customer", Routers.CustomerRouter)
]

export const excludedPaths: ExcludedPath[] = [
    new ExcludedPath("/auth/login", "POST")
]