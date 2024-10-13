import { Module } from "@nestjs/common";
import { MulterModule } from "@nestjs/platform-express";

import { ApiGatewayController } from "./api-gateway.controller";
import { ApiGatewayService } from "./api-gateway.service";
import { ImageHandlerModule } from "./image-handler/image-handler.module";

@Module({
    imports: [
        MulterModule.register({
            dest: "./tmp"
        }),
        ImageHandlerModule
    ],
    controllers: [ApiGatewayController],
    providers: [ApiGatewayService]
})
export class ApiGatewayModule {}
