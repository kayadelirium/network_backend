import { Request, Response } from "express";
import SubscribersService from "../services/SubscribersService";
import { IController } from "../types/controllers";
import { IPair } from "../types/models";

const SubscribersController: IController = {
    create: async (req: Request, res: Response) => {
        try {
            const { firstId, secondId } = req.query;
            if (!firstId || !secondId) res.status(400).send();
            const subscribers: IPair = { firstId: Number(firstId), secondId: Number(secondId) };
            const result: IPair = await SubscribersService.create(subscribers);
            res.status(201).json(result);
        } catch (e) {
            res.status(500).json(e);
        }
    },
    readAll: async (req: Request, res: Response) => {
        try {
            const { firstId, secondId } = req.query;
            const pairs = await SubscribersService.readAll({ firstId, secondId });
            res.json(pairs);
        } catch (e) {
            res.status(500).json(e);
        }
    },
    readOne: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            if (!id) res.status(400).send();
            const pair: IPair = await SubscribersService.readOne(Number(id));
            res.json(pair);
        } catch (e) {
            res.status(500).json(e);
        }
    },
    delete: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            if (!id) res.status(400).send();
            await SubscribersService.delete(Number(id));
            res.status(204).send();
        } catch (e) {
            res.status(500).json(e);
        }
    },
};

export default SubscribersController;
