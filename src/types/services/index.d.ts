import { IAuth } from "../models";

export interface IService<T> {
    create?: (t: T) => Promise<T>;
    readAll?: (props?: any) => Promise<T[]>;
    readOne?: (id: number) => Promise<T>;
    update?: (id: number, t: T) => Promise<void>;
    delete?: (id: number) => Promise<void>;
}

export interface IAuthService<T> extends IService<T> {
    auth?: (credentials: IAuth) => Promise<T>;
}
