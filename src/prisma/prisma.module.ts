import { Module } from "@nestjs/common";

import { AppHostModule } from "@internal/app-host.module";
import { PrismaService } from "@internal/prisma/prisma.service";

@Module( {
    providers: [
        PrismaService,
    ],
    exports: [
        PrismaService,
    ],
    imports: [
        AppHostModule,
    ]
} )
export class PrismaModule {
}
