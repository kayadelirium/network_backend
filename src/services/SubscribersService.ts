import Subscribers from "../models/Subscribers";
import { IPair } from "../types/models";
import { IService } from "../types/services";

const SubscribersService: IService<IPair> = {
    create: async (subscribers: IPair): Promise<IPair> => {
        const pair = Subscribers.build(subscribers);
        const result: IPair = await pair.save();
        return result;
    },
    readAll: async (props): Promise<IPair[]> => {
        const { firstId, secondId } = props;
        let pairs: IPair[];
        if (!firstId && !secondId) {
            pairs = await Subscribers.findAll();
        } else if (!firstId) {
            pairs = await Subscribers.findAll({ where: { secondId: Number(secondId) } });
        } else if (!secondId) {
            pairs = await Subscribers.findAll({ where: { firstId: Number(firstId) } });
        } else {
            pairs = await Subscribers.findAll({ where: { firstId: Number(firstId), secondId: Number(secondId) } });
        }
        return pairs;
    },
    readOne: async (id: number): Promise<IPair> => {
        const pair: IPair = await Subscribers.findByPk(id);
        return pair;
    },
    delete: async (id: number): Promise<void> => {
        await Subscribers.destroy({ where: { id } });
    },
};

export default SubscribersService;
