import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { ConfigService } from "@nestjs/config";
import { MulterModule } from "@nestjs/platform-express";

import { ImageHandlerService } from "./image-handler.service";
import { IMAGE_HANDLER_CLIENT } from "./constants/constants";
import { ImageHandlerController } from "./image-handler.controller";

@Module({
    imports: [
        ClientsModule.registerAsync([
            {
                name: IMAGE_HANDLER_CLIENT,
                useFactory: async (configService: ConfigService) => {
                    return {
                        transport: Transport.RMQ,
                        options: {
                            urls: [
                                configService.get<string>(
                                    "microservices.imageHandler.rmqUrl"
                                )
                            ],
                            queue: configService.get<string>(
                                "microservices.imageHandler.rmqQueue"
                            ),
                            queueOptions: {
                                durable: false
                            }
                        }
                    };
                },
                inject: [ConfigService]
            }
        ]),
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
