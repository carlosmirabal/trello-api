import { NextFunction, Request, Response } from "express";
import { JWTAdapter } from "../../config";
import { prisma } from "../../data/postgres";
import { UserEntity } from "../../domain";

export class AuthMiddleware {
    static async validateJWT(req: Request, res: Response, next: NextFunction) {
        const authorization = req.headers.authorization;

        if (!authorization) {
            res.status(401).json({ error: "Not token provided" });
            return;
        }

        if (!authorization.startsWith("Bearer")) {
            res.status(401).json({ error: "Invalid Bearer token" });
            return;
        }

        const token = authorization.split(" ").at(1) || "";

        try {
            const payload = await JWTAdapter.validateToken<{ id: number }>(token);

            if (!payload) {
                res.status(401).json({ error: "Invalid token" });
                return;
            }

            const user = await prisma.users.findFirst({ where: { id: payload.id } });

            if (!user) {
                res.status(401).json({ error: "Invalid token - user" });
                return;
            }

            // req.body.user = UserEntity.fromObject(user);
            req.body = { user: UserEntity.fromObject(user), payload: req.body };

            next();
        } catch (error) {
            res.status(500).json({ error: "Internal server error" });
        }
    }
}
