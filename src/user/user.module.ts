import { Module } from "@nestjs/common";

import { UserController } from "@internal/user/user.controller";

import { PrismaModule } from "@internal/prisma/prisma.module";

import { UserService } from "@internal/user/user.service";

@Module( {
    controllers: [
      UserController,
    ],
    providers: [
        UserService,
    ],
    exports: [
        UserService,
    ],
    imports: [
        PrismaModule,
    ],
} )

export class UserModule {
}
