import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";

import { Profile, Strategy } from "passport-discord";

import { AuthService } from "@internal/auth/auth.service";

@Injectable()

export class DiscordStrategyService extends PassportStrategy( Strategy ) {
    public constructor(
        private authService: AuthService,
    ) {
        super( {
            clientID: process.env.DISCORD_OAUTH_CLIENT_ID,
            clientSecret: process.env.DISCORD_OAUTH_CLIENT_SECRET,
            callbackURL: process.env.DISCORD_OAUTH_CALLBACK_URL,
            scope: [ "identify", "email" ],
        } );
    }

    public async validate( accessToken: string, refreshToken: string, profile: Profile, callback: Function ) {
        const { id, email, discriminator, username, avatar } = profile;

        await this.authService.ensureToken( {
            discordId: id,
            accessToken,
            refreshToken,
        } );

        const user = await this.authService.ensureUser( {
            discordId: id,
            email,
            username,
            discriminator,
            avatar,
        } );

        callback( null, user );
    }
}
