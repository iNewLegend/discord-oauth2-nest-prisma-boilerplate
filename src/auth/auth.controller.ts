import { randomBytes } from "crypto";

import { Controller, Get, Logger, Param, Request, Session } from "@nestjs/common";

import { DiscordStrategyService } from "@internal/discord/discord-strategy.service";

function generateRandomState( length: number = 16 ): string {
    const bytes = randomBytes( length );
    return bytes.toString( "hex" );
}

@Controller( "auth" )

export class AuthController {
    public constructor( private discordStrategy: DiscordStrategyService ) {
    }

    @Get( "login/:code/:state" )

    public async login( @Param( "code" ) code: string, @Param( "state" ) state: string, @Session() session: Record<string, any>, @Request() req ) {
        // Validate state.
        if ( state !== session.state ) {
            delete session.state;

            return {
                error: true,
                message: "Invalid state.",
            };
        }

        return await this.discordStrategy.ensureAsync( code ).then( async ( user ) => {
            const result = new Promise( ( resolve, reject ) => {
                req.login( user, ( error ) => {
                    if ( error ) {
                        reject( {
                            error: true,
                            message: "Error logging in.",
                        } );
                    }

                    Logger.log( `User ${ user.username } logged in.` );

                    resolve( user );
                } );
            } );

            return await result;
        } ).catch( ( error ) => {
            return {
                error: true,
                code: error.statusCode,
                message: error.data,
            };
        } );
    }

    //------------------------------------------------------------------------------------------------------------------

    @Get( "get" )

    public get( @Request() req, @Session() session: Record<string, any> ) {
        const isAuth = req.isAuthenticated();

        if ( isAuth ) {
            return {
                profile: req.user,
            };
        }

        session.state = generateRandomState();

        return {
            loginURL: this.discordStrategy.getAuthorizeUrl( session.state ),
        };
    }
    //------------------------------------------------------------------------------------------------------------------

    @Get( "logout" )

    public logout( @Request() req ) {
        req.logout( () => {} );
    }
}
