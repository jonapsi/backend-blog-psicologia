import { ServerApp } from "./server.js";
import { envs } from "./config/envs.js";
import { AppRoutes } from "./presentation/routes/index.js"
import { AppDataSource } from "./data-source.js";

(async () => {
    try {
        await AppDataSource.initialize();
        console.log("Database connected successfully!");
        main();
    } catch (error) {
        console.error("Error during Data Source initialization:", error);
    }
})()


function main() {
    const server = new ServerApp({
        port: envs.PORT,
        path: envs.PUBLIC_PATH,
        router: AppRoutes.router,
    });
    server.start();
}