import { ConfigService } from "@nestjs/config";
import { RmqOptions, Transport } from "@nestjs/microservices";

export class RmqService {
    constructor(private readonly configService: ConfigService) {}

    getOptions(serviceName: string): RmqOptions {
        return {
            transport: Transport.RMQ,
            options: {
                urls: [
                    this.configService.get<string>(
                        `microservices.${serviceName}.rmqUrl`
                    )
                ],
                queue: this.configService.get<string>(
                    `microservices.${serviceName}.rmqQueue`
                ),
                queueOptions: {
                    durable: false
                }
            }
        };
    }
}
