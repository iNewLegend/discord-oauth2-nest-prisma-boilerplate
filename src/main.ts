import { NestFactory } from "@nestjs/core";

import { AppHostService } from "@internal/app-host.service";
import { AppModule } from "@internal/app.module";

async function bootstrap() {
    const app = await NestFactory.create( AppModule );

    app.select( AppModule ).get( AppHostService ).instance = app;

    await app.listen( process.env.API_LISTEN_PORT || 700 );
}

bootstrap();
