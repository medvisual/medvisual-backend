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
            transform: true,
            whitelist: true,
            forbidNonWhitelisted: true
        })
    );

    await app.listen(port);
    console.log(
        `Server is running on port ${port} ` +
            `[${configService.get("environment")}]...`
    );
}

bootstrap();
