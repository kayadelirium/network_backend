import { Request, Response } from "express";
import { IAuth, IUser } from "../types/models";
import { IUserController } from "../types/controllers";
import UserService from "../services/UserService";

const UserController: IUserController = {
    create: async (req: Request, res: Response) => {
        try {
            const user: IUser = req.body;
            const result: IUser = await UserService.create(user);

            result ? res.status(201).json(result) : res.status(409).send();
        } catch (e) {
            res.status(500).json(e);
        }
    },

    auth: async (req: Request, res: Response) => {
        try {
            const credentials: IAuth = req.body;
            const user = await UserService.auth(credentials);

            user ? res.status(200).json(user) : res.status(401).send();
        } catch (e) {
            res.status(500).json(e);
        }
    },

    readAll: async (req: Request, res: Response) => {
        try {
            const users: IUser[] = await UserService.readAll();
            res.json(users);
        } catch (e) {
            res.status(500).json(e);
        }
    },

    readOne: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            if (!id) res.status(400).send();
            const user: IUser = await UserService.readOne(Number(id));
            res.json(user);
        } catch (e) {
            res.status(500).json(e);
        }
    },

    update: async (req: Request, res: Response) => {
        try {
            const user: IUser = req.body;
            const { id } = req.params;
            if (!user.id || !id) res.status(400).send();
            await UserService.update(Number(id), user);
            res.status(204).send();
        } catch (e) {
            res.status(500).json(e);
        }
    },

    delete: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            if (!id) res.status(400).send();
            await UserService.delete(Number(id));
            res.status(204).send();
        } catch (e) {
            res.status(500).json(e);
        }
    },
};

export default UserController;
