import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import * as Joi from "joi";
import { TypeOrmModule } from "@nestjs/typeorm";

import config from "./config/configuration";
import { AuthModule } from "./auth/auth.module";
import { BlacklistedRefreshToken } from "./auth/entities/blacklisted-refresh-token.entity";

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
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => {
                if (configService.get<string>("environment") === "production") {
                    return {
                        type: "postgres",
                        url: configService.get<string>("database.url"),
                        ssl: {
                            rejectUnauthorized: false
                        },
                        entities: [BlacklistedRefreshToken],
                        synchronize: false
                    };
                } else {
                    return {
                        type: "postgres",
                        host: configService.get<string>("database.host"),
                        port: configService.get<number>("database.port"),
                        username:
                            configService.get<string>("database.username"),
                        password:
                            configService.get<string>("database.password"),
                        database: configService.get<string>("database.name"),
                        entities: [BlacklistedRefreshToken],
                        synchronize: true
                    };
                }
            },
            inject: [ConfigService]
        }),
        AuthModule
    ]
})
export class AuthAppModule {}
