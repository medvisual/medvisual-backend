import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import * as Joi from "joi";

import config from "./config/configuration";
import { AuthController } from "./auth.controller";
import { USERS_CLIENT_NAME } from "./constants/constants";
import { RmqModule } from "@medvisual/common/rmq";
import { USERS_SERVICE_NAME } from "@medvisual/contracts/users";

@Module({
    imports: [
        ConfigModule.forRoot({
            ignoreEnvFile: process.env.NODE_ENV === "production",
            envFilePath: "apps/auth/.env",
            validationSchema: Joi.object({
                NODE_ENV: Joi.string()
                    .valid("development", "production")
                    .default("development"),
                RMQ_URL: Joi.string().uri(),
                RMQ_QUEUE: Joi.string().required(),
                RMQ_USERS_QUEUE: Joi.string().required(),
                JWT_ACCESS_SECRET: Joi.string().token().required(),
                JWT_REFRESH_SECRET: Joi.string().token().required(),
                JWT_ACCESS_EXPIRES_IN_SECONDS: Joi.string().required(),
                JWT_REFRESH_EXPIRES_IN_SECONDS: Joi.string().required()
            }),
            validationOptions: {
                allowUnknown: true,
                abortEarly: true
            },
            isGlobal: true,
            load: [config]
        }),
        RmqModule.register({
            clientName: USERS_CLIENT_NAME,
            serviceName: USERS_SERVICE_NAME
        }),
        JwtModule.registerAsync({
            useFactory: (configService: ConfigService) => ({
                global: true,
                secret: configService.getOrThrow<string>("jwt.access.secret"),
                signOptions: {
                    expiresIn: configService.getOrThrow<string>(
                        "jwt.access.expiresInSeconds"
                    )
                }
            }),
            inject: [ConfigService]
        })
    ],
    controllers: [AuthController],
    providers: [AuthService]
})
export class AuthModule {}
