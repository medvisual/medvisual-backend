import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { ConfigService } from "@nestjs/config";

import { DiseasesService } from "./diseases.service";
import { DISEASES_CLIENT } from "./constants/constants";
import { DiseasesController } from "./diseases.controller";

@Module({
    imports: [
        ClientsModule.registerAsync([
            {
                name: DISEASES_CLIENT,
                useFactory: async (configService: ConfigService) => {
                    return {
                        transport: Transport.RMQ,
                        options: {
                            urls: [
                                configService.get<string>(
                                    "microservices.diseases.rmqUrl"
                                )
                            ],
                            queue: configService.get<string>(
                                "microservices.diseases.rmqQueue"
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
    controllers: [DiseasesController],
    providers: [DiseasesService]
})
export class DiseasesModule {}
