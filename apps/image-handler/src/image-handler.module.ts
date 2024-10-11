import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import * as Joi from "joi";

import { ImageHandlerController } from "./image-handler.controller";
import { ImageHandlerService } from "./image-handler.service";
import { GeminiClientModule } from "./gemini-client/gemini-client.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            validationSchema: Joi.object({
                GEMINI_API_KEY: Joi.string().required(),
                GEMINI_MODEL: Joi.string().required(),
                BASE_IMAGE_PROMPT: Joi.string()
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
