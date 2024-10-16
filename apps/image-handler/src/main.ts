import { NestFactory } from "@nestjs/core";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { ValidationPipe } from "@nestjs/common";

import { ImageHandlerModule } from "./image-handler.module";

async function bootstrap() {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(
        ImageHandlerModule,
        {
            transport: Transport.TCP,
            options: {
                host: "0.0.0.0",
                port: 3001
            }
        }
    );
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true
        })
    );

    await app.listen();
}

bootstrap();
