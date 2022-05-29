import { Request, Response } from "express";
import PostService from "../services/PostService";
import { IController } from "../types/controllers";
import { IPost } from "../types/models";

const PostController: IController = {
    create: async (req: Request, res: Response) => {
        try {
            const { text, date }: IPost = req.body;
            const { authorId } = req.query;
            if (!authorId) res.status(400).send();
            const post: IPost = { text, date, authorId: Number(authorId) };
            const result: IPost = await PostService.create(post);
            res.status(201).json(result);
        } catch (e) {
            res.status(500).json(e);
        }
    },
    readAll: async (req: Request, res: Response) => {
        try {
            const { authorId } = req.query;
            const posts: IPost[] = await PostService.readAll({ authorId });
            res.json(posts);
        } catch (e) {
            res.status(500).json(e);
        }
    },
    readOne: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            if (!id) res.status(400).send();
            const post: IPost = await PostService.readOne(Number(id));
            res.json(post);
        } catch (e) {
            res.status(500).json(e);
        }
    },
    update: async (req: Request, res: Response) => {
        try {
            const post: IPost = req.body;
            const { id } = req.params;
            if (!post.id || !id) res.status(400).send();
            await PostService.update(Number(id), post);
            res.status(204).send();
        } catch (e) {
            res.status(500).json(e);
        }
    },
    delete: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            if (!id) res.status(400).send();
            await PostService.delete(Number(id));
            res.status(204).send();
        } catch (e) {
            res.status(500).json(e);
        }
    },
};

export default PostController;
