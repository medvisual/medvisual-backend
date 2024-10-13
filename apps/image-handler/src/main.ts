import { NestFactory } from "@nestjs/core";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";

import { ImageHandlerModule } from "./image-handler.module";

async function bootstrap() {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(
        ImageHandlerModule,
        {
            transport: Transport.TCP,
            options: {
                port: 3001
            }
        }
    );

    await app.listen();
}

bootstrap();
