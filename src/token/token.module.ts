import { Module } from "@nestjs/common";

import { PrismaModule } from "@internal/prisma/prisma.module";

import { TokenService } from "@internal/token/token.service";

@Module( {
    exports: [
        TokenService,
    ],
    providers: [
        TokenService,
    ],
    imports: [
        PrismaModule,
    ],
} )

export class TokenModule {
}
