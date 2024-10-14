import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";

import { ApiGatewayModule } from "./api-gateway.module";

async function bootstrap() {
    const app = await NestFactory.create(ApiGatewayModule);
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true
        })
    );

    await app.listen(3000);
}

bootstrap();
