import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { MulterModule } from "@nestjs/platform-express";

import { ImageHandlerService } from "./image-handler.service";
import { IMAGE_HANDLER_CLIENT_NAME } from "./constants/constants";
import { ImageHandlerController } from "./image-handler.controller";
import { IMAGE_HANDLER_SERVICE_NAME } from "@medvisual/contracts/image-handler";
import { RmqModule } from "@medvisual/common/rmq/rmq.module";

@Module({
    imports: [
        RmqModule.register({
            clientName: IMAGE_HANDLER_CLIENT_NAME,
            serviceName: IMAGE_HANDLER_SERVICE_NAME
        }),
        MulterModule.registerAsync({
            useFactory: async (configService: ConfigService) => {
                return {
                    dest: configService.get<string>("imageUploadFolder")
                };
            },
            inject: [ConfigService]
        })
    ],
    controllers: [ImageHandlerController],
    providers: [ImageHandlerService]
})
export class ImageHandlerModule {}
