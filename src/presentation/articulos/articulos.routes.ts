import { Router } from "express";
import { ArticulosController } from "./articulos.controller.js";



export class ArticulosRoutes {
    static get router(): Router {
        const router = Router();
        const controller = new ArticulosController();
        router.post('/', controller.createBlog);
        router.get('/', controller.getAllBlogs);
        router.put('/:id', controller.updateBlog);
        router.delete('/:id', controller.deleteBlog);
        router.get('/:id', controller.getBlogById);
        return router;
    }
}



/* public router: Router;
    private controller: ArticulosController;

    constructor() {
        this.router = Router();
        this.controller = new ArticulosController();
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post('api/v1/blogs', this.controller.createBlog);
        this.router.get('api/v1/blogs', this.controller.getAllBlogs);
        this.router.put('api/v1/blogs/:id', this.controller.updateBlog);
        this.router.delete('api/v1/blogs/:id', this.controller.deleteBlog);
        this.router.get('api/v1/blogs/:id', this.controller.getBlogById);
    } */

