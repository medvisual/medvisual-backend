import { NestFactory } from "@nestjs/core";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { ValidationPipe } from "@nestjs/common";

import { ImageHandlerModule } from "./image-handler.module";

async function bootstrap() {
    const host = process.env.HOST;
    const port = parseInt(process.env.PORT, 10);

    const app = await NestFactory.createMicroservice<MicroserviceOptions>(
        ImageHandlerModule,
        {
            transport: Transport.TCP,
            options: {
                host: host,
                port: port
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
