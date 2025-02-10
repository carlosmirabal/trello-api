import { Router } from "express";
import { AuthRoutes } from "./auth/routes";
import { UserRoutes } from "./users/routes";
import { WorkSpaceRoutes } from "./workspaces/routes";
export class AppRoutes {
    static get routes(): Router {
        const router = Router();

        // Definir las rutas
        // router.use('/api/todos', /*TodoRoutes.routes */ );
        router.use("/api/v1/auth", AuthRoutes.routes);
        router.use("/api/v1/users", UserRoutes.routes);
        router.use("/api/v1/workspaces", WorkSpaceRoutes.routes);

        return router;
    }
}
