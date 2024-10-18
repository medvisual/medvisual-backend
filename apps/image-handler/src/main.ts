import { NestFactory } from "@nestjs/core";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { ValidationPipe } from "@nestjs/common";

import { ImageHandlerModule } from "./image-handler.module";

async function bootstrap() {
    const isProduction: boolean = process.env.NODE_ENV === "production";
    const rmqUrl = isProduction
        ? process.env.CLOUDAMQP_URL
        : process.env.RMQ_URL || "rabbitmq";

    const app = await NestFactory.createMicroservice<MicroserviceOptions>(
        ImageHandlerModule,
        {
            transport: Transport.RMQ,
            options: {
                urls: [rmqUrl],
                queue: process.env.RMQ_QUEUE,
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
    console.log(`Microservice is running [production: ${isProduction}]...`);
}

bootstrap();
