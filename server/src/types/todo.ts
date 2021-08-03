import { Document } from 'mongoose'

export interface ITodo extends Document {
    text: string;
    isCompleted: boolean;
}

export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    isAdmin: Boolean;
    encryptPassword(password: string): Promise<string>;
    validatePassword(password: string): Promise<boolean>;
}

export interface IPayload extends Document {
    _id: string;
    iat: number;
    exp: number;
}