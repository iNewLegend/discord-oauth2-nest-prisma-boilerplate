import { Controller, Get, UseGuards } from "@nestjs/common";

import { DiscordAuthGuard } from "@internal/discord/discord-auth-guard.service";

@Controller( "auth" )

export class AuthController {

    @Get( "" ) @UseGuards( DiscordAuthGuard )

    public auth() {
    }
    // -----------------------------------------------------------------------------------------------------------------

    @Get( "callback" ) @UseGuards( DiscordAuthGuard )

    public callback() {
    }
    // -----------------------------------------------------------------------------------------------------------------
}
