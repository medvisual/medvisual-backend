import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import * as Joi from "joi";

import applicationConfig from "./config/api-gateway.configuration";
import microservicesConfig from "./config/microservices.configuration";
import { ImageHandlerModule } from "./image-handler/image-handler.module";
import { DiseasesModule } from "./diseases/diseases.module";

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
        ImageHandlerModule,
        DiseasesModule
    ]
})
export class ApiGatewayModule {}
