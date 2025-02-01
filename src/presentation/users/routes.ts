import { Router } from "express";
import { UserService } from "../services/user.service";
import { UserController } from "./controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";

export class UserRoutes {
    static get routes(): Router {
        const router = Router();

        const userService = new UserService();

        const controller = new UserController(userService);

        //Middleware
        router.use(AuthMiddleware.validateJWT);

        // Routes definition
        router.get("/", controller.getUsers);
        router.get("/:id", controller.getUserById);

        return router;
    }
}
