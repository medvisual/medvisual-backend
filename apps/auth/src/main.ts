import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import {
    MicroserviceOptions,
    RpcException,
    Transport
} from "@nestjs/microservices";

import { AuthAppModule } from "./auth-app.module";

async function bootstrap() {
    const isProduction = process.env.NODE_ENV === "production";
    const rmqUrl = isProduction
        ? process.env.CLOUDAMQP_URL
        : process.env.RMQ_URL || "rabbitmq";

    const app = await NestFactory.createMicroservice<MicroserviceOptions>(
        AuthAppModule,
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
            transform: true,
            whitelist: true,
            forbidNonWhitelisted: true,
            exceptionFactory: (errors) => {
                return new RpcException(
                    errors.map((error) => error.constraints)
                );
            }
        })
    );

    await app.listen();
    console.log(`Microservice is running [production: ${isProduction}]...`);
}
bootstrap();
