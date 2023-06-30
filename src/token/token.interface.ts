interface ITokenBase {
    discordId: string;
    accessToken: string;
    refreshToken: string;
}

export interface ITokenInputData extends ITokenBase {
    expiresIn: number
}

export interface ITokenOutputData extends ITokenBase {
    expiresAt: Date
}
