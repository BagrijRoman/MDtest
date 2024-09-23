import { NextFunction, Request, Response } from "express";

type ExpressMiddlewareFnType = (req: Request, res: Response, next?: NextFunction) => Promise<any>;

export { ExpressMiddlewareFnType };
