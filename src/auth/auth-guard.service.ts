import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";

@Injectable()

export class AuthGuardService implements CanActivate {
    public async canActivate( context: ExecutionContext ) {
        const request = context.switchToHttp().getRequest();

        return request.isAuthenticated();
    }
}
