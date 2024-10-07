import { NestFactory } from "@nestjs/core";
import { ImageHandlerModule } from "./image-handler.module";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";

async function bootstrap() {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(
        ImageHandlerModule,
        {
            transport: Transport.TCP,
            options: {
                port: 3017
            }
        }
    );

    await app.listen();
}

bootstrap();
