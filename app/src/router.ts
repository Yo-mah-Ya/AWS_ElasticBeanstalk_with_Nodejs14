import { Router, Request, Response } from "express";

export const createRouter = (): Router => {
    const router: Router = Router();
    router.get("/health", (_: Request, res: Response) => {
        res.status(200).send("OK");
    });
    router.get("/test", (_: Request, res: Response): void => {
        res.status(200).json({ message: " test" });
    });
    return router;
};
