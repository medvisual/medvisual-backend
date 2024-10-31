import { DynamicModule, Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ClientsModule, Transport } from "@nestjs/microservices";

import { IRmqModuleOptions } from "./interfaces/rmq-module-options.interface";

@Module({})
export class RmqModule {
    static register(options: IRmqModuleOptions): DynamicModule {
        const clientModule = ClientsModule.registerAsync([
            {
                name: options.clientName,
                useFactory: (configService: ConfigService) => {
                    return {
                        transport: Transport.RMQ,
                        options: {
                            urls: [
                                configService.get<string>(
                                    `microservices.${options.serviceName}.rmqUrl`
                                )
                            ],
                            queue: configService.get<string>(
                                `microservices.${options.serviceName}.rmqQueue`
                            ),
                            queueOptions: {
                                durable: false
                            }
                        }
                    };
                },
                inject: [ConfigService]
            }
        ]);

        return {
            module: RmqModule,
            imports: [clientModule],
            exports: [ClientsModule]
        };
    }
}
