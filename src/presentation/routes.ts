import { Request, Response, Router } from "express";


export class AppRoutes {
    static get routes(): Router {
        const router = Router();

        // Definir las rutas
        // router.use('/api/todos', /*TodoRoutes.routes */ );
        router.get("/api/", (req: Request, res: Response) => {
            res.json('Get API')
        })

        return router;
    }
}
