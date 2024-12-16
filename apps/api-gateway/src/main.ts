import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

import { ApiGatewayModule } from "./api-gateway.module";

async function bootstrap() {
    const app = await NestFactory.create(ApiGatewayModule);
    const configService = app.get(ConfigService);
    const port = configService.get<number>("port");

    app.setGlobalPrefix("api");
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            whitelist: true,
            forbidNonWhitelisted: true
        })
    );

    const docsConfig = new DocumentBuilder()
        .setTitle("Medvisual")
        .setDescription("The medvisual API documentation")
        .setVersion("0.0.1")
        .build();
    const documentFactory = () => SwaggerModule.createDocument(app, docsConfig);
    SwaggerModule.setup("/api/docs", app, documentFactory, {
        jsonDocumentUrl: "/api/docs/json"
    });

    await app.listen(port);
    console.log(
        `Server is running on port ${port} ` +
            `[${configService.get("environment")}]...`
    );
}

bootstrap();
