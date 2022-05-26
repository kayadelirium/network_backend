import { Request, Response } from "express";
import MessageService from "../services/MessageService";
import { IController } from "../types/controllers";
import { IMessage } from "../types/models";

const MessageController: IController = {
    create: async (req: Request, res: Response) => {
        try {
            const { text, date }: IMessage = req.body;
            const { authorId, chatId } = req.query;
            if (!authorId || !chatId) res.status(400).send();
            const message = { text, date, authorId: Number(authorId), chatId: Number(chatId) };
            const result: IMessage = await MessageService.create(message);
            res.status(201).json(result);
        } catch (e) {
            res.status(500).json(e);
        }
    },
    readAll: async (req: Request, res: Response) => {
        try {
            const { authorId, chatId } = req.query;
            const messages: IMessage[] = await MessageService.readAll({ authorId, chatId });
            res.json(messages);
        } catch (e) {
            res.status(500).json(e);
        }
    },
    readOne: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            if (!id) res.status(400).send();
            const message: IMessage = await MessageService.readOne(Number(id));
            res.json(message);
        } catch (e) {
            res.status(500).json(e);
        }
    },
    update: async (req: Request, res: Response) => {
        try {
            const message: IMessage = req.body;
            const { id } = req.params;
            if (!message.id || !id) res.status(400).send();
            await MessageService.update(Number(id), message);
            res.status(204).send();
        } catch (e) {
            res.status(500).json(e);
        }
    },
    delete: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            if (!id) res.status(400).send();
            await MessageService.delete(Number(id));
            res.status(204).send();
        } catch (e) {
            res.status(500).json(e);
        }
    },
};

export default MessageController;
