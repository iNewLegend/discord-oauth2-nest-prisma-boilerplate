import { Injectable } from "@nestjs/common";

import { TokenService } from "@internal/token/token.service";
import { UserService } from "@internal/user/user.service";

import { ITokenInputData } from "@internal/token/token.interface";
import { IUserData } from "@internal/user/user.interface";

@Injectable()

export class AuthService {
    public constructor(
        private readonly sessionService: TokenService,
        private readonly userService: UserService
    ) {
    }

    public async ensureToken( inputData: ITokenInputData ) {
        const isExist = !! await this.sessionService.get( inputData.discordId );

        return isExist ?
            await this.sessionService.update( inputData ) :
            await this.sessionService.create( inputData );
    }

    public async ensureUser( inputData: IUserData ) {
        const isExist = !! await this.userService.get( inputData.discordId );

        return isExist ?
            await this.userService.update( inputData ) :
            await this.userService.create( inputData );
    }
}
