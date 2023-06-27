import { Controller, Get, Request, UseGuards } from "@nestjs/common";

import { AuthGuardService } from "@internal/auth/auth-guard.service";

@Controller( "user" )

export class UserController {

    @Get( "me" ) @UseGuards( AuthGuardService )

    public me( @Request() req ) {
        return req.user;
    }
    // -----------------------------------------------------------------------------------------------------------------

}
