import { Router } from "express";
import { AutorController } from "./autores.controller.js";

export class AutoresRoutes {
    static get router(): Router {
        const router = Router();
        const controller = new AutorController();
        router.post('/', controller.createAutor);
        router.get('/', controller.getAllAutores);
        router.put('/:id', controller.updateAutor);
        router.delete('/:id', controller.deleteAutor);
        return router;
    }
}
/* 
public router: Router;
    private controller: AutorController;

    constructor() {
        this.router = Router();
        this.controller = new AutorController();
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post('/api/v1/autores', this.controller.createAutor);
        this.router.get('/api/v1/autores', this.controller.getAllAutores);
        this.router.put('/api/v1/autores/:id', this.controller.updateAutor);
        this.router.delete('/api/v1/autores/:id', this.controller.deleteAutor);
    } */