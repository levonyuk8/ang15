import {requestDTO} from "./request.model";

export interface IUserDTO extends requestDTO {
    userInfo: IUserInfo,
    tokens: IToken
}

export interface IUserInfo {
    userId: number,
    userName: string,
    userAvatar: string,
    userRole: number
}

export interface IToken {
    token: string,
    refreshToken: string
}


export enum USER_ROLES {
    user,
    admin
}