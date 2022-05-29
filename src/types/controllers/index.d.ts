import { Request, Response } from "express";

export interface IController {
    create?: (req: Request, res: Response) => Promise<void>;
    readAll?: (req: Request, res: Response) => Promise<void>;
    readOne?: (req: Request, res: Response) => Promise<void>;
    update?: (req: Request, res: Response) => Promise<void>;
    delete?: (req: Request, res: Response) => Promise<void>;
}

export interface IUserController extends IController {
    auth?: (req: Request, res: Response) => Promise<void>;
}
