import Message from "../models/Message";
import { IMessage } from "../types/models";
import { IService } from "../types/services";

const MessageService: IService<IMessage> = {
    create: async (message: IMessage): Promise<IMessage> => {
        const newMessage = Message.build(message);
        const result: IMessage = await newMessage.save();
        return result;
    },
    readAll: async (props): Promise<IMessage[]> => {
        const { authorId, chatId } = props;
        let messages: IMessage[];
        if (!authorId && !chatId) {
            messages = await Message.findAll();
        } else if (!authorId) {
            messages = await Message.findAll({ where: { chatId: Number(chatId) } });
        } else if (!chatId) {
            messages = await Message.findAll({ where: { authorId: Number(authorId) } });
        } else {
            messages = await Message.findAll({ where: { authorId: Number(authorId), chatId: Number(chatId) } });
        }
        return messages;
    },
    readOne: async (id: number): Promise<IMessage> => {
        const message: IMessage = await Message.findByPk(id);
        return message;
    },
    update: async (id: number, message: IMessage): Promise<void> => {
        await Message.update(message, { where: { id } });
    },
    delete: async (id: number): Promise<void> => {
        await Message.destroy({ where: { id } });
    },
};

export default MessageService;
