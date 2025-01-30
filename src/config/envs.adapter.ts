import "dotenv/config";
import { get } from "env-var";

export const envs = {
    PORT: get("PORT").required().asPortNumber(),

    JWT_SEED: get("JWT_SEED").required().asString(),

    POSTGRES_URL: get("POSTGRES_URL").required().asString(),
    POSTGRES_USER: get("POSTGRES_USER").required().asString(),
    POSTGRES_DB: get("POSTGRES_DB").required().asString(),
    POSTGRES_PORT: get("POSTGRES_PORT").required().asPortNumber(),
    POSTGRES_PASSWORD: get("POSTGRES_PASSWORD").required().asString(),

    NODE_ENV: get("NODE_ENV").required().asString(),
};
