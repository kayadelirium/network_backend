import { Request, Response } from "express";
import LikeService from "../services/LikeService";
import { IController } from "../types/controllers";
import { ILike } from "../types/models";

const LikeController: IController = {
    create: async (req: Request, res: Response) => {
        try {
            const { userId, postId } = req.query;
            if (!userId || !postId) res.status(400).send();
            const like: ILike = { userId: Number(userId), postId: Number(postId) };
            const result: ILike = await LikeService.create(like);
            res.status(201).json(result);
        } catch (e) {
            res.status(500).json(e);
        }
    },
    readAll: async (req: Request, res: Response) => {
        try {
            const { userId, postId } = req.query;
            const likes: ILike[] = await LikeService.readAll({ userId, postId });
            res.json(likes);
        } catch (e) {
            res.status(500).json(e);
        }
    },
    readOne: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            if (!id) res.status(400).send();
            const like: ILike = await LikeService.readOne(Number(id));
            res.json(like);
        } catch (e) {
            res.status(500).json(e);
        }
    },
    delete: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            if (!id) res.status(400).send();
            await LikeService.delete(Number(id));
            res.status(204).send();
        } catch (e) {
            res.status(500).json(e);
        }
    },
};

export default LikeController;
