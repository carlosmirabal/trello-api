import jwt from "jsonwebtoken";
import { envs } from "./envs.adapter";

const JWT_SEED = envs.JWT_SEED;

export class JWTAdapter {

    static generateToken(payload: any, duration: string = "2h") {

        return new Promise((resolve) => {

            jwt.sign(payload, JWT_SEED, { expiresIn: "2h" }, (err, token) => {
                if (err) return resolve(null);

                return resolve(token);
            });
        });

    }

    static validateToken<T>(token: string): Promise<T | null> {

        return new Promise((resolve) => {

            jwt.verify(token, JWT_SEED, (err, decoded) => {
                if (err) return resolve(null);

                return resolve(decoded as T);
            })
            
        })
    }
}
