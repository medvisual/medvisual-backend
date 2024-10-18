import { Module } from "@nestjs/common";
import { MulterModule } from "@nestjs/platform-express";
import { ConfigModule, ConfigService } from "@nestjs/config";
import * as Joi from "joi";

import { ApiGatewayController } from "./api-gateway.controller";
import { ApiGatewayService } from "./api-gateway.service";
import { ImageHandlerModule } from "./image-handler/image-handler.module";
import applicationConfig from "./config/api-gateway.configuration";
import microservicesConfig from "./config/microservices.configuration";

@Module({
    imports: [
        ConfigModule.forRoot({
            ignoreEnvFile: process.env.NODE_ENV === "production",
            envFilePath: "apps/api-gateway/.env",
            validationSchema: Joi.object({
                NODE_ENV: Joi.string()
                    .valid("development", "production")
                    .default("development"),
                PORT: Joi.number().port().default(3000),
                IMAGE_UPLOAD_FOLDER: Joi.string().required(),
                RMQ_URL: Joi.string().uri().required(),
                RMQ_IMAGE_HANDLER_QUEUE: Joi.string().required()
            }),
            validationOptions: {
                allowUnknown: true,
                abortEarly: true
            },
            isGlobal: true,
            load: [applicationConfig, microservicesConfig]
        }),
        MulterModule.registerAsync({
            useFactory: async (configService: ConfigService) => {
                return {
                    dest: configService.get<string>("imageUploadFolder")
                };
            },
            inject: [ConfigService]
        }),
        ImageHandlerModule
    ],
    controllers: [ApiGatewayController],
    providers: [ApiGatewayService]
})
export class ApiGatewayModule {}
