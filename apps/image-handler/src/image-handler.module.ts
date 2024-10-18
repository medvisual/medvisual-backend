import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import * as Joi from "joi";

import { ImageHandlerController } from "./image-handler.controller";
import { ImageHandlerService } from "./image-handler.service";
import { GeminiClientModule } from "./gemini-client/gemini-client.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            ignoreEnvFile: process.env.NODE_ENV === "production",
            envFilePath: "apps/image-handler/.env",
            validationSchema: Joi.object({
                NODE_ENV: Joi.string()
                    .valid("development", "production")
                    .default("development"),
                RMQ_URL: Joi.string().uri().required(),
                RMQ_QUEUE: Joi.string().required(),
                GEMINI_API_KEY: Joi.string().required(),
                GEMINI_MODEL: Joi.string().required(),
                BASE_DISEASE_IMAGE_PROMPT: Joi.string().required()
            }),
            validationOptions: {
                allowUnknown: true,
                abortEarly: true
            }
        }),
        GeminiClientModule
    ],
    controllers: [ImageHandlerController],
    providers: [ImageHandlerService]
})
export class ImageHandlerModule {}
