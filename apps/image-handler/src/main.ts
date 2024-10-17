import { NestFactory } from "@nestjs/core";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { ValidationPipe } from "@nestjs/common";

import { ImageHandlerModule } from "./image-handler.module";

async function bootstrap() {
    const microserviceOptions: MicroserviceOptions = {
        transport: Transport.TCP,
        options: {
            port: parseInt(process.env.PORT, 10)
        }
    };
    const isDevelopment: boolean = process.env.NODE_ENV === "development";
    if (isDevelopment) {
        microserviceOptions.options.host = process.env.HOST;
    }

    const app = await NestFactory.createMicroservice<MicroserviceOptions>(
        ImageHandlerModule,
        microserviceOptions
    );
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true
        })
    );

    await app.listen();
    console.log(
        `Microservice is running on ` +
            `${microserviceOptions.options.host || "localhost"}:` +
            `${microserviceOptions.options.port}...`
    );
}

bootstrap();
