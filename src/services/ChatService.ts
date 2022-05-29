import Chat from "../models/Chat";
import { IChat } from "../types/models";
import { IService } from "../types/services";

const ChatService: IService<IChat> = {
    create: async (chat: IChat): Promise<IChat> => {
        const newChat = Chat.build(chat);
        const result: IChat = await newChat.save();
        return result;
    },
    readAll: async (props): Promise<IChat[]> => {
        const { firstId, secondId } = props;
        let chats: IChat[];
        if (!firstId && !secondId) {
            chats = await Chat.findAll();
        } else if (!firstId) {
            chats = await Chat.findAll({ where: { secondId: Number(secondId) } });
        } else if (!secondId) {
            chats = await Chat.findAll({ where: { firstId: Number(firstId) } });
        } else {
            chats = await Chat.findAll({ where: { firstId: Number(firstId), secondId: Number(secondId) } });
        }
        return chats;
    },
    readOne: async (id: number): Promise<IChat> => {
        const chat: IChat = await Chat.findByPk(id);
        return chat;
    },
    update: async (id: number, oldChat: IChat): Promise<void> => {
        const { lastMessageId } = oldChat;
        const chat: IChat = await Chat.findByPk(id);
        if (lastMessageId) chat.lastMessageId = lastMessageId;
        await Chat.update(chat, { where: { id } });
    },
    delete: async (id: number): Promise<void> => {
        await Chat.destroy({ where: { id } });
    },
};

export default ChatService;
