import { NestFactory } from "@nestjs/core";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { ValidationPipe } from "@nestjs/common";

import { ImageHandlerModule } from "./image-handler.module";
import microserviceConfig from "./config/configuration";

async function bootstrap() {
    const config = microserviceConfig();
    const rmqUrl = config.rmq.url;

    const app = await NestFactory.createMicroservice<MicroserviceOptions>(
        ImageHandlerModule,
        {
            transport: Transport.RMQ,
            options: {
                urls: [rmqUrl],
                queue: config.rmq.queue,
                queueOptions: {
                    durable: false
                }
            }
        }
    );
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true
        })
    );

    await app.listen();
    console.log(
        `Microservice is running [production: ${config.environment === "production"}]...`
    );
}

bootstrap();
