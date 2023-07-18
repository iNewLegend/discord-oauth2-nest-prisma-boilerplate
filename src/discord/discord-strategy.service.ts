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
            scope: process.env.DISCORD_OUATH_CLIENT_SCOPES.split( " " ),
        } );
    }

    public getAuthorizeUrl( state, callbackURL = process.env.DISCORD_OAUTH_CALLBACK_URL ) {
        return this._oauth2.getAuthorizeUrl( {
            response_type: "code",
            redirect_uri: callbackURL,
            scope: process.env.DISCORD_OUATH_CLIENT_SCOPES,
            state,
        } );
    }

    public async validate( accessToken: string, refreshToken: string, expiresIn: number, profile: Profile, callback: Function ) {
        const { id, email, discriminator, username, avatar } = profile;

        await this.authService.ensureToken( {
            discordId: id,
            accessToken,
            refreshToken,
            expiresIn
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

    public async ensureAsync( code: string ) {
        const { accessToken, refreshToken, expiresIn } = await this.getAccessTokenAsync( code ),
            { id, email, discriminator, username, avatar } = await this.getUserProfileAsync( accessToken );

        await this.authService.ensureToken( {
            discordId: id,
            accessToken,
            refreshToken,
            expiresIn,
        } );

        return await this.authService.ensureUser( {
            discordId: id,
            email,
            username,
            discriminator,
            avatar,
        } );
    }

    private async getUserProfileAsync( accessToken: string ): Promise<Profile> {
        return new Promise( ( resolve, reject ) => {
            this.userProfile( accessToken, ( err, profile: Profile ) => {
                if ( err ) {
                    return reject( err );
                }

                resolve( profile );
            } );
        } );
    }

    private async getAccessTokenAsync( code: string, callbackURL = process.env.DISCORD_OAUTH_CALLBACK_URL ): Promise<{
        accessToken: string,
        refreshToken: string,
        expiresIn: number,
    }> {
        return new Promise( ( resolve, reject ) => {
            this._oauth2.getOAuthAccessToken( code, {
                grant_type: "authorization_code",
                redirect_uri: callbackURL,
            }, ( err, access_token, refresh_token: string, params: any ) => {
                if ( err ) {
                    return reject( err );
                }

                resolve( {
                    accessToken: access_token,
                    refreshToken: refresh_token,
                    expiresIn: params.expires_in,
                } );
            } );
        } );
    }
}
