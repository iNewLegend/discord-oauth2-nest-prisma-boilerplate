import { Injectable } from "@nestjs/common";

import { PrismaService } from "@internal/prisma/prisma.service";

import { IUserData } from "@internal/user/user.interface";

@Injectable()

export class UserService {
    public constructor( private prisma: PrismaService ) {
    }

    public async get( discordId: string ) {
        return this.prisma.user.findUnique( { where: { discordId } } );
    }

    public async create( data: IUserData ) {
        this.ensureAvatar( data );

        return this.prisma.user.create( { data } );
    }

    public async update( data: IUserData ) {
        this.ensureAvatar( data );

        const discordId = data.discordId;

        delete data.discordId;

        return this.prisma.user.update( { where: { discordId }, data } );
    }

    private ensureAvatar( data: IUserData ) {
        data.avatar = data.avatar ? `https://cdn.discordapp.com/avatars/${ data.discordId }/${ data.avatar }.png` :
            `https://cdn.discordapp.com/embed/avatars/${ data.discriminator.substring( 0, 1 ) }.png`;
    }
}
