import { Injectable } from "@nestjs/common";

import { PrismaService } from "@internal/prisma/prisma.service";

import { ITokenInputData, ITokenOutputData } from "@internal/token/token.interface";

@Injectable()

export class TokenService {
    public constructor( private prisma: PrismaService ) {
    }

    public async get( discordId: string ) {
        return this.prisma.token.findUnique( { where: { discordId } } );
    }

    public async create( inputData: ITokenInputData ) {
        const data = this.ensureOutputData( inputData );

        return this.prisma.token.create( { data } );
    }

    public async update( inputData: ITokenInputData ) {
        const data = this.ensureOutputData( inputData ),
            discordId = data.discordId;

        delete data.discordId;

        return this.prisma.token.update( { where: { discordId }, data } );
    }

    private ensureOutputData( inputData: ITokenInputData ): ITokenOutputData {
        return {
            discordId: inputData.discordId,
            accessToken: inputData.accessToken,
            refreshToken: inputData.refreshToken,
            expiresAt: new Date( Date.now() + inputData.expiresIn ),
        };
    }
}
