import { Request, Response } from "express";
import { IMedia } from "../types/models";
import FileHelper from "../helpers/FileHelper";
import { IController } from "../types/controllers";
import MediaService from "../services/MediaService";

const MediaController: IController = {
    create: async (req: Request, res: Response) => {
        try {
            const { type } = req.body;
            const { file } = req.files;
            const { postId } = req.query;
            if (!postId) res.status(400).send();
            const media: IMedia = { type, path: FileHelper.saveFile(file, type), postId: Number(postId) };
            const result = await MediaService.create(media);
            res.status(201).json(result);
        } catch (e) {
            res.status(500).json(e);
        }
    },
    readAll: async (req: Request, res: Response) => {
        try {
            const { postId } = req.query;
            const media: IMedia[] = await MediaService.readAll({ postId });
            res.json(media);
        } catch (e) {
            res.status(500).json(e);
        }
    },
    delete: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            if (!id) res.status(400).send();
            await MediaService.delete(Number(id));
            res.status(204).send();
        } catch (e) {
            res.status(500).json(e);
        }
    },
};

export default MediaController;
