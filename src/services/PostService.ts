import Post from "../models/Post";
import { IPost } from "../types/models";
import { IService } from "../types/services";

const PostService: IService<IPost> = {
    create: async (post: IPost): Promise<IPost> => {
        const newPost = Post.build(post);
        const result: IPost = await newPost.save();
        return result;
    },
    readAll: async (props): Promise<IPost[]> => {
        const { authorId } = props;
        const posts: IPost[] = authorId ? await Post.findAll({ where: { authorId: Number(authorId) } }) : await Post.findAll();
        return posts;
    },
    readOne: async (id: number): Promise<IPost> => {
        const post: IPost = await Post.findByPk(id);
        return post;
    },
    update: async (id: number, post: IPost): Promise<void> => {
        await Post.update(post, { where: { id } });
    },
    delete: async (id: number): Promise<void> => {
        await Post.destroy({ where: { id } });
    },
};

export default PostService;
