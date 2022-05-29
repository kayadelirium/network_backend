import Friends from "../models/Friends";
import { IPair } from "../types/models";
import { IService } from "../types/services";

const FriendsService: IService<IPair> = {
    create: async (friends: IPair): Promise<IPair> => {
        const pair = Friends.build(friends);
        const result: IPair = await pair.save();
        return result;
    },
    readAll: async (props): Promise<IPair[]> => {
        const { firstId, secondId } = props;
        let pairs: IPair[];
        if (!firstId && !secondId) {
            pairs = await Friends.findAll();
        } else if (!firstId) {
            pairs = await Friends.findAll({ where: { secondId: Number(secondId) } });
        } else if (!secondId) {
            pairs = await Friends.findAll({ where: { firstId: Number(firstId) } });
        } else {
            pairs = await Friends.findAll({ where: { firstId: Number(firstId), secondId: Number(secondId) } });
        }
        return pairs;
    },
    readOne: async (id: number): Promise<IPair> => {
        const pair: IPair = await Friends.findByPk(id);
        return pair;
    },
    delete: async (id: number): Promise<void> => {
        await Friends.destroy({ where: { id } });
    },
};

export default FriendsService;
