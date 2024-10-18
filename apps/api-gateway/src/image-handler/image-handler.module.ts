import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { ConfigService } from "@nestjs/config";

import { ImageHandlerService } from "./image-handler.service";
import { IMAGE_HANDLER_CLIENT } from "./constants/constants";

@Module({
    imports: [
        ClientsModule.registerAsync([
            {
                name: IMAGE_HANDLER_CLIENT,
                useFactory: (configService: ConfigService) => {
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
        ])
    ],
    providers: [ImageHandlerService],
    exports: [ImageHandlerService]
})
export class ImageHandlerModule {}
