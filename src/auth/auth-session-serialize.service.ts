import { Injectable } from "@nestjs/common";

import { PassportSerializer } from "@nestjs/passport";

import { IUserData } from "@internal/user/user.interface";

import { UserService } from "@internal/user/user.service";

@Injectable()

export class AuthSessionSerializeService extends PassportSerializer {
    public constructor(
        private userService: UserService,
    ) {
        super();
    }

    public serializeUser( user: IUserData, callback: Function ) {
        callback( null, user );
    }

    public async deserializeUser( user: IUserData, callback: Function ) {
        const userFromDB = await this.userService.get( user.discordId ) || null;

        return callback( null, userFromDB );
    }
}
