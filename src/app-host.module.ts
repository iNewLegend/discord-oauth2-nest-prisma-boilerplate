import { Module } from "@nestjs/common";

import { AppHostService } from "@internal/app-host.service";

@Module( {
    providers: [ AppHostService ],
    exports: [ AppHostService ],
} )

export class AppHostModule {
}
