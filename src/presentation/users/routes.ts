import { Router } from "express";
import { UserService } from "../services/user.service";
import { UserController } from "./controller";

export class UserRoutes {
    static get routes(): Router {
        const router = Router();

        const userService = new UserService();

        const controller = new UserController(userService);

        // Definir las rutas
        router.get("/", controller.getUsers);
        router.get("/:id", controller.getUserById);

        return router;
    }
}
