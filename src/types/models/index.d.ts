export interface IAuth {
    login: string;
    password: string;
}
export interface IUser extends IAuth {
    id?: number;
    birthdate: Date;
    name: string;
    surname: string;
    token?: string;
}

export interface IPost {
    id?: number;
    text: string;
    date: Date;
    authorId: number;
}

export interface IMedia {
    id?: number;
    type: string;
    path: string;
    postId: number;
}

export interface IPair {
    id?: number;
    firstId: number;
    secondId: number;
}

export interface IMessage {
    id?: number;
    text: string;
    date: Date;
    authorId: number;
    adresseeId?: number;
    chatId: number;
}

export interface IChat {
    id?: number;
    firstId: number;
    secondId: number;
    lastMessageId?: number;
}

export interface ILike {
    id?: number;
    postId: number;
    userId: number;
}
