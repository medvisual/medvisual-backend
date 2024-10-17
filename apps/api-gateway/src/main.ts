import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";

import { ApiGatewayModule } from "./api-gateway.module";
import { ConfigService } from "@nestjs/config";

async function bootstrap() {
    const app = await NestFactory.create(ApiGatewayModule);
    const configService = app.get(ConfigService);
    const port = configService.get<number>("port");

    app.useGlobalPipes(
        new ValidationPipe({
            transform: true
        })
    );

    await app.listen(port);
}

bootstrap();
