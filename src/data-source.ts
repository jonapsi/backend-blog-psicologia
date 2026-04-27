import "reflect-metadata";
import { DataSource } from "typeorm";
import { envs } from "./config/envs.js";
import { Blog } from "./entity/blog.js";
import { Autores } from "./entity/autores.js";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: envs.DB_HOST,
    port: envs.DB_PORT,
    username: envs.DB_USER,
    password: envs.DB_PASSWORD,
    database: envs.DB_NAME,
    entities: [Blog, Autores],
    synchronize: false,
    logging: true,
    migrations: ["src/migration/**/*.ts"],
    subscribers: [],
})
