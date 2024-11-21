import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import * as Joi from "joi";

import config from "./config/configuration";
import { DiseasesModule } from "./diseases/diseases.module";
import { DiseaseEntity } from "./diseases/entities/disease.entity";

@Module({
    imports: [
        ConfigModule.forRoot({
            ignoreEnvFile: process.env.NODE_ENV === "production",
            envFilePath: "apps/diseases/.env",
            validationSchema: Joi.object({
                NODE_ENV: Joi.string()
                    .valid("development", "production")
                    .default("development"),
                RMQ_URL: Joi.string().uri(),
                RMQ_QUEUE: Joi.string().required(),
                DATABASE_URL: Joi.string().uri(),
                DATABASE_HOST: Joi.string().hostname().default("postgres"),
                DATABASE_PORT: Joi.number().port().default(5432),
                DATABASE_USERNAME: Joi.string(),
                DATABASE_PASSWORD: Joi.string(),
                DATABASE_NAME: Joi.string()
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
                        entities: [DiseaseEntity],
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
                        entities: [DiseaseEntity],
                        synchronize: true
                    };
                }
            },
            inject: [ConfigService]
        }),
        DiseasesModule
    ]
})
export class DiseasesAppModule {}
