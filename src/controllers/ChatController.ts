import { Request, Response } from "express";
import ChatService from "../services/ChatService";
import { IController } from "../types/controllers";
import { IChat } from "../types/models";

const ChatController: IController = {
    // create: async (req: Request, res: Response) => {
    //     try {
    //         const { firstId, secondId } = req.query;
    //         if (!firstId || !secondId) res.status(400).send();
    //         const chat: IChat = { firstId: Number(firstId), secondId: Number(secondId) };
    //         const result: IChat = await ChatService.create(chat);
    //         res.status(201).json(result);
    //     } catch (e) {
    //         res.status(500).json(e);
    //     }
    // },
    readAll: async (req: Request, res: Response) => {
        try {
            const { firstId, secondId } = req.query;
            const chats = await ChatService.readAll({ firstId, secondId });
            res.json(chats);
        } catch (e) {
            res.status(500).json(e);
        }
    },
    readOne: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            if (!id) res.status(400).send();
            const chat: IChat = await ChatService.readOne(Number(id));
            res.json(chat);
        } catch (e) {
            res.status(500).json(e);
        }
    },
    // update: async (req: Request, res: Response) => {
    //     try {
    //         const { id } = req.params;
    //         const { lastMessageId } = req.query;
    //         if (!id) res.status(400).send();
    //         const updatedChat: IChat = await ChatService.readOne(Number(id));
    //         updatedChat.lastMessageId = Number(lastMessageId);
    //         await ChatService.update(Number(id), updatedChat);
    //         res.status(204).send();
    //     } catch (e) {
    //         res.status(500).json(e);
    //     }
    // },
    // delete: async (req: Request, res: Response) => {
    //     try {
    //         const { id } = req.params;
    //         if (!id) res.status(400).send();
    //         await ChatService.delete(Number(id));
    //         res.status(204).send();
    //     } catch (e) {
    //         res.status(500).json(e);
    //     }
    // },
};

export default ChatController;
