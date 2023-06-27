import { Module } from "@nestjs/common";

import { PrismaModule } from "@internal/prisma/prisma.module";
import { UserService } from "@internal/user/user.service";

@Module({
    providers: [
        UserService,
    ],
    exports: [
        UserService,
    ],
    imports: [
        PrismaModule,
    ],
})

export class UserModule {}
