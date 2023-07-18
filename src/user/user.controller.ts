import { Controller, Get, Request, UseGuards } from "@nestjs/common";

import { AuthGuard } from "@internal/auth/auth.guard";

@Controller( "user" )

export class UserController {

    @Get( "me" ) @UseGuards( AuthGuard )

    public me( @Request() req ) {
        return req.user;
    }
    //------------------------------------------------------------------------------------------------------------------

}
