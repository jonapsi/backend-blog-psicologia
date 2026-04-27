import express from 'express';
import type { Router } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


interface ServerSettings {
    port: number;
    path: string;
    router: Router;
}

export class ServerApp {
    private readonly app = express();
    private readonly port: number;
    private readonly path: string;
    private readonly router: Router;

    constructor(settings: ServerSettings) {
        const { port, path, router } = settings;
        this.port = port;
        this.path = path;
        this.router = router;

    }

    start() {
        this.app.use(express.json());

        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cors({ origin: '*' }));
        this.app.use(express.static(this.path));

        this.app.use(this.router);
        this.app.get(/^\/.*$/, (req, res) => {
            const indexpath = path.join(__dirname, `../../${this.path}/index.html`);
            res.sendFile(indexpath);
        });

        this.app.listen(this.port, () => {
            console.log(`Server is running on port http://localhost:${this.port}`);
        });
    }

}