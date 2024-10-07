import { NestFactory } from "@nestjs/core";
import { MedvisualApiGatewayModule } from "./medvisual-api-gateway.module";

async function bootstrap() {
    const app = await NestFactory.create(MedvisualApiGatewayModule);
    await app.listen(3017);
}

bootstrap();
