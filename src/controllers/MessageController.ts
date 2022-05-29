import { Request, Response } from "express";
import ChatService from "../services/ChatService";
import MessageService from "../services/MessageService";
import { IController } from "../types/controllers";
import { IMessage } from "../types/models";

const MessageController: IController = {
    create: async (req: Request, res: Response) => {
        try {
            const { text, date }: IMessage = req.body;
            const { authorId, addresseeId } = req.query;
            if (!authorId || !addresseeId) res.status(400).send();
            const chats = [
                ...(await ChatService.readAll({ firstId: Number(authorId), secondId: Number(addresseeId) })),
                ...(await ChatService.readAll({ firstId: Number(addresseeId), secondId: Number(authorId) })),
            ];
            let chatId: number;
            if (!chats.length) {
                const newChat = await ChatService.create({ firstId: Number(authorId), secondId: Number(addresseeId) });
                chatId = newChat.id;
            } else chatId = chats[0].id;

            const message: IMessage = { text, date, authorId: Number(authorId), chatId: Number(chatId) };
            const result: IMessage = await MessageService.create(message);

            const chat = await ChatService.readOne(chatId);
            chat.lastMessageId = result.id;
            await ChatService.update(chatId, chat);

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
