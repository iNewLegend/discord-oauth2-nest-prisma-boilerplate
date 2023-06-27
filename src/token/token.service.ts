import { Injectable } from "@nestjs/common";

import { PrismaService } from "@internal/prisma/prisma.service";

import { ITokenData } from "@internal/token/token.interface";

@Injectable()

export class TokenService {
    public constructor( private prisma: PrismaService ) {
    }

    public async get( discordId: string ) {
        return this.prisma.token.findUnique( { where: { discordId } } );
    }

    public async create( data: ITokenData ) {
        return this.prisma.token.create( { data } );
    }

    public async update( data: ITokenData ) {
        const discordId = data.discordId;

        delete data.discordId;

        return this.prisma.token.update( { where: { discordId }, data } );
    }
}
