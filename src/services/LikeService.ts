import { Request, Response } from "express";
import Like from "../models/Like";
import { ILike } from "../types/models";
import { IService } from "../types/services";

const LikeService: IService<ILike> = {
    create: async (like: ILike): Promise<ILike> => {
        const newLike = Like.build(like);
        const result: ILike = await newLike.save();
        return result;
    },
    readAll: async (props): Promise<ILike[]> => {
        const { userId, postId } = props;
        let likes: ILike[];
        if (!userId && !postId) {
            likes = await Like.findAll();
        } else if (!userId) {
            likes = await Like.findAll({ where: { postId: Number(postId) } });
        } else if (!postId) {
            likes = await Like.findAll({ where: { userId: Number(userId) } });
        } else {
            likes = await Like.findAll({ where: { userId: Number(userId), postId: Number(postId) } });
        }
        return likes;
    },
    readOne: async (id: number): Promise<ILike> => {
        const like: ILike = await Like.findByPk(id);
        return like;
    },
    delete: async (id: number): Promise<void> => {
        await Like.destroy({ where: { id } });
    },
};

export default LikeService;
