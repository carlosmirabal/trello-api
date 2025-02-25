import { Router } from "express";

import { AuthMiddleware } from "../middlewares/auth.middleware";
import { WorkSpaceController } from "./controller";
import { WorkSpaceService } from "../services/workspace.service";

export class WorkSpaceRoutes {
    static get routes(): Router {
        const router = Router();

        const workSpaceService = new WorkSpaceService();

        const controller = new WorkSpaceController(workSpaceService);

        //Middleware
        router.use(AuthMiddleware.validateJWT);

        // Routes definition
        router.get("/", controller.getWorkSpaces);
        router.get("/:id", controller.getWorkSpacesById);
        router.post("/", controller.createWorkSpace);
        router.put("/:id", controller.updateWorkSpace);
        // router.put("/:id", controller.updateUser);

        return router;
    }
}
