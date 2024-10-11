import { Module } from "@nestjs/common";
import { ImageHandlerService } from "./image-handler.service";
import { ClientsModule, Transport } from "@nestjs/microservices";

@Module({
    imports: [
        ClientsModule.register([
            {
                name: "IMAGE_HANDLER_CLIENT",
                transport: Transport.TCP,
                options: { port: 3017 }
            }
        ])
    ],
    providers: [ImageHandlerService],
    exports: [ImageHandlerService]
})
export class ImageHandlerModule {}
