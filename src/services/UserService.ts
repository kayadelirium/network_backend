import TokenHelper from "../helpers/TokenHelper";
import User from "../models/User";
import { IAuth, IUser } from "../types/models";
import { IAuthService } from "../types/services";

const UserService: IAuthService<IUser> = {
    create: async (user: IUser): Promise<IUser> => {
        const { login } = user;
        const oldUser = await User.findOne({ where: { login } });

        if (oldUser) return null;

        const createdUser = await User.build(user).save();
        const token = TokenHelper.generateToken(createdUser.id);
        const result: IUser = { ...createdUser, token };
        return result;
    },

    auth: async (credentials: IAuth): Promise<IUser> => {
        const { login, password } = credentials;
        const user = await User.findOne({ where: { login } });

        if (user && password === user.password) {
            const token = TokenHelper.generateToken(user.id);
            const result: IUser = { ...user, token };
            return result;
        } else return null;
    },

    readAll: async (): Promise<IUser[]> => {
        const users: IUser[] = await User.findAll({ attributes: ["login", "name", "surname", "birthdate"] });
        return users;
    },

    readOne: async (id: number): Promise<IUser> => {
        const user: IUser = await User.findByPk(id, { attributes: ["login", "name", "surname", "birthdate"] });
        return user;
    },

    update: async (id: number, user: IUser): Promise<void> => {
        await User.update(user, { where: { id } });
    },

    delete: async (id: number): Promise<void> => {
        await User.destroy({ where: { id } });
    },
};

export default UserService;
