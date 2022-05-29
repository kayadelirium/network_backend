import Media from "../models/Media";
import { IMedia } from "../types/models";
import { IService } from "../types/services";

const MediaService: IService<IMedia> = {
    create: async (media: IMedia): Promise<IMedia> => {
        const result = await Media.build(media).save();
        return result;
    },
    readAll: async (props): Promise<IMedia[]> => {
        const { postId } = props;
        const media: IMedia[] = postId ? await Media.findAll({ where: { postId: Number(postId) } }) : await Media.findAll();
        return media;
    },
    delete: async (id: number): Promise<void> => {
        await Media.destroy({ where: { id } });
    },
};

export default MediaService;
