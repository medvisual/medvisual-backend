import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";

import microserviceConfig from "./config/configuration";
import { DiseasesAppModule } from "./diseases-app.module";

async function bootstrap() {
    const config = microserviceConfig();
    const rmqUrl = config.rmq.url;

    const app = await NestFactory.createMicroservice<MicroserviceOptions>(
        DiseasesAppModule,
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
            transform: true,
            whitelist: true,
            forbidNonWhitelisted: true
        })
    );

    await app.listen();
    console.log(
        `Microservice is running [production: ${config.environment === "production"}]...`
    );
}

bootstrap();
