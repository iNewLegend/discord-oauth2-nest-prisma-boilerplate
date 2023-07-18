import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()

export class DiscordAuthGuard extends AuthGuard( "discord" ) {

    public async canActivate( context: ExecutionContext ) {
        const activate = !! await super.canActivate( context );

        const request = context.switchToHttp().getRequest();

        await super.logIn( request );

        return activate;
    }
}
