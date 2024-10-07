import { Module } from "@nestjs/common";
import { MedvisualApiGatewayController } from "./medvisual-api-gateway.controller";
import { MedvisualApiGatewayService } from "./medvisual-api-gateway.service";
import { ImageHandlerModule } from "./image-handler/image-handler.module";

@Module({
    imports: [ImageHandlerModule],
    controllers: [MedvisualApiGatewayController],
    providers: [MedvisualApiGatewayService]
})
export class MedvisualApiGatewayModule {}
