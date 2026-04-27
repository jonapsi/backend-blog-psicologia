import { Router } from "express";
import { AutoresRoutes } from "../autores/autores.routes.js";
import { ArticulosRoutes } from "../articulos/articulos.routes.js";

export class AppRoutes {
    static get router(): Router {
        const router = Router();
        router.use("/api/v1/autores", AutoresRoutes.router);
        router.use("/api/v1/blogs", ArticulosRoutes.router);
        return router;
    }

}

