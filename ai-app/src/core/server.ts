import express from 'express';
class Server {
    listen(port: number, callback: () => void) {
        this.app.listen(port, callback);
    }
    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }
    public app: express.Application;
    private config(): void {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
    }
    private routes(): void {
        let router: express.Router;
        router = express.Router();
        this.app.use('/', router);
        this.app.use(this.logger);
        // this.app.use('/api/v1/', api);
    }
    private logger(req: express.Request, res: express.Response, next: express.NextFunction): void {
        console.log(`${req.method} ${req.url} ${req.ip}`);
        next();
    }
}
const app = new Server();
export default app;