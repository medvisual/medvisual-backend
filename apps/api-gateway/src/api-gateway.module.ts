import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import * as Joi from "joi";

import applicationConfig from "./config/api-gateway.configuration";
import microservicesConfig from "./config/microservices.configuration";
import { ImageHandlerModule } from "./image-handler/image-handler.module";
import { DiseasesModule } from "./diseases/diseases.module";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";

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
                RMQ_URL: Joi.string().uri(),
                RMQ_IMAGE_HANDLER_QUEUE: Joi.string().required(),
                RMQ_DISEASES_QUEUE: Joi.string().required(),
                RMQ_USERS_QUEUE: Joi.string().required(),
                RMQ_AUTH_QUEUE: Joi.string().required(),
                JWT_ACCESS_SECRET: Joi.string().token().required(),
                JWT_REFRESH_SECRET: Joi.string().token().required()
            }),
            validationOptions: {
                allowUnknown: true,
                abortEarly: true
            },
            isGlobal: true,
            load: [applicationConfig, microservicesConfig]
        }),
        ImageHandlerModule,
        DiseasesModule,
        UsersModule,
        AuthModule
    ]
})
export class ApiGatewayModule {}
