import * as passport from "passport";
import * as session from "express-session";

import { Module, NestModule } from "@nestjs/common";

import { PrismaSessionStore } from "@quixo3/prisma-session-store";

import { PrismaClient } from "@prisma/client";

import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

import { AppHostService } from "@internal/app-host.service";
import { AuthSessionSerializeService } from "@internal/auth/auth-session-serialize.service";
import { AuthGuardService } from "@internal/auth/auth-guard.service";
import { DiscordStrategyService } from "@internal/discord/discord-strategy.service";

import { AppHostModule } from "@internal/app-host.module";
import { UserModule } from "@internal/user/user.module";
import { TokenModule } from "@internal/token/token.module";

@Module( {
    controllers: [ AuthController ],
    providers: [
        DiscordStrategyService,
        AuthSessionSerializeService,
        AuthGuardService,
        AuthService
    ],
    imports: [
        AppHostModule,
        TokenModule,
        UserModule,
    ]
} )

export class AuthModule implements NestModule {
    public constructor( private appHost: AppHostService ) {
    }

    public configure() {
        // Init passport.
        const app = this.appHost.instance;

        app.use(
            session( {
                cookie: {
                    maxAge: parseInt( process.env.API_COOKIE_MAX_AGE ),
                },
                secret: process.env.API_COOCKIE_SECRET,
                resave: false,
                saveUninitialized: false,
                store: new PrismaSessionStore(
                    new PrismaClient(),
                    {
                        logger: console,
                        loggerLevel: "log",
                        checkPeriod: parseInt( process.env.API_SESSION_CHECK_INTERVAL ),
                        dbRecordIdIsSessionId: true,
                        dbRecordIdFunction: undefined,
                    }
                ),
            } )
        );

        /* eslint-disable */
        app.use( passport.initialize() );
        app.use( passport.session() );
        /* eslint-enable */
    }
}
