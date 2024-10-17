import { Module } from "@nestjs/common";
import {
    ClientsModule,
    TcpClientOptions,
    Transport
} from "@nestjs/microservices";
import { ConfigService } from "@nestjs/config";

import { ImageHandlerService } from "./image-handler.service";
import { IMAGE_HANDLER_CLIENT } from "./constants/constants";

@Module({
    imports: [
        ClientsModule.registerAsync([
            {
                name: IMAGE_HANDLER_CLIENT,
                useFactory: async (configService: ConfigService) => {
                    const isDevelopment: boolean =
                        configService.get("environment") === "development";

                    const clientOptions: TcpClientOptions = {
                        transport: Transport.TCP,
                        options: {}
                    };
                    clientOptions.options.host = configService.get<string>(
                        "microservices.imageHandler.host"
                    );
                    // When running locally, specify the port
                    if (isDevelopment) {
                        clientOptions.options.port = configService.get<number>(
                            "microservices.imageHandler.port"
                        );
                    }

                    return clientOptions;
                },
                inject: [ConfigService]
            }
        ])
    ],
    providers: [ImageHandlerService],
    exports: [ImageHandlerService]
})
export class ImageHandlerModule {}
