import express, { Locals, Request, Response } from 'express';
class Server {
    public app: express.Application;
    constructor() {
        this.app = express();
        this.config();
        this.routes();
        this.staticFolder('src\\render');
    }
    post(path: string, cb: (req: any, res: any) => void) {

        this.app.post(path, (req, res) => cb(req, res));
    }
    staticFolder(path: string) {
        this.app.use(express.static(path));
    }
    get(path: string, callback: (req: Request<any, any, any, any, Record<string, any>>, res: Response<any, any>) => void) {
        this.app.get(path, (req, res) => callback(req, res));
    }
    listen(port: number, callback: () => void) {
        this.app.listen(port, callback);
    }
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