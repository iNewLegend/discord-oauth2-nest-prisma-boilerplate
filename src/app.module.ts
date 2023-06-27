import { Module } from "@nestjs/common";

import { AuthModule } from "@internal/auth/auth.module";
import { AppHostModule } from "@internal/app-host.module";
import { PrismaModule } from "@internal/prisma/prisma.module";

@Module( {
    imports: [
        AppHostModule,
        PrismaModule,
        AuthModule
    ],
} )

export class AppModule {
}
