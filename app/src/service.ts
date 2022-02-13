import express, {
    Express,
    Response,
    NextFunction,
    ErrorRequestHandler,
} from "express";
import compression from "compression";
import helmet from "helmet";
import { createRouter } from "./router";

const errorHandler: ErrorRequestHandler<unknown, { message: string }> = (
    error,
    req,
    res: Response,
    next: NextFunction
) => {
    if (res.headersSent) return next(error);

    console.log(
        JSON.stringify({
            message: error instanceof Error ? error.message : "unknown error",
            callSite: {
                file: __filename,
                function: errorHandler.name,
            },
            path: req.path,
        })
    );
    res.status(500).json({ message: "server error" });
};

export const getExpressApp = (): Express => {
    const app = express();
    app.use(compression());
    app.use(helmet());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(createRouter());
    app.use(errorHandler);

    return app;
};

export const startService = (): void => {
    const app = getExpressApp();
    const port = 3000;
    const server = app.listen(port, () => {
        console.dir({
            message: `Express Server Start. Listening to port ${port}`,
        });
    });
    server.keepAliveTimeout = 0;
};
