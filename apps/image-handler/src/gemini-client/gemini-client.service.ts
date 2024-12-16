import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleAIFileManager } from "@google/generative-ai/server";
import { consola } from "consola";
import { resolve } from "path";
import * as fs from "node:fs";

import { ImageUploadDto } from "@medvisual/contracts/image-handler";
import { GeminiVerdictDto } from "@medvisual/contracts/image-handler/dto/gemini-verdict.dto";
import { diseaseImageSchema } from "./schemas/gemini-client.schema";
import { RpcException } from "@nestjs/microservices";

@Injectable()
export class GeminiClientService {
    public constructor(private configService: ConfigService) {}

    private readonly imageUploadFolder =
        this.configService.get<string>("imageUploadFolder");
    private readonly ai = new GoogleGenerativeAI(
        this.configService.get<string>("ai.geminiApiKey")
    );
    private readonly model = this.ai.getGenerativeModel({
        model: this.configService.get<string>("ai.geminiModel"),
        generationConfig: {
            responseMimeType: "application/json",
            responseSchema: diseaseImageSchema
        }
    });
    private readonly fileManager = new GoogleAIFileManager(
        this.configService.get<string>("ai.geminiApiKey")
    );
    private readonly baseDiseaseImagePrompt = this.configService.get<string>(
        "ai.prompts.baseDiseaseImage"
    );

    async getGeminiImageVerdict(
        imageUploadDto: ImageUploadDto
    ): Promise<GeminiVerdictDto> {
        // Generate the prompt to analyze the image and compile statistics on presumed diseases
        const prompt: string =
            this.baseDiseaseImagePrompt +
            imageUploadDto.presumedDiseases.join(", ");

        try {
            // TODO: Ideally, this should be substituted with S3 or something
            const uploadFolder = resolve(__dirname, this.imageUploadFolder);
            const uploadPath = resolve(uploadFolder, imageUploadDto.image.name);

            consola.info(`Saving image file...`);
            // Create the upload folder if it doesn't exist
            if (!fs.existsSync(uploadFolder)) {
                consola.info(
                    `Specified upload folder ${uploadFolder} doesn't exist. Creating...`
                );
                fs.mkdirSync(resolve(__dirname, this.imageUploadFolder), {
                    recursive: true
                });
                consola.success(`Created folder ${uploadFolder}`);
            }
            // Deserialize the base64 image buffer string and write to the temporary local file
            const imageBuffer = Buffer.from(
                imageUploadDto.image.buffer,
                "base64"
            );
            fs.writeFileSync(uploadPath, imageBuffer);
            consola.success(`Saved file locally to ${uploadPath}`);

            const uploadResult = await this.fileManager.uploadFile(uploadPath, {
                mimeType: imageUploadDto.image.mimetype,
                displayName: "image"
            });
            consola.success(`Uploaded file ${uploadResult.file.displayName}`);

            const result = await this.model.generateContent([
                prompt,
                {
                    fileData: {
                        fileUri: uploadResult.file.uri,
                        mimeType: uploadResult.file.mimeType
                    }
                }
            ]);
            consola.info(
                `Received response from Gemini: ${result.response.text()}`
            );

            fs.unlinkSync(uploadPath);
            consola.success(`Deleted local image file ${uploadPath}`);

            return JSON.parse(result.response.text());
        } catch (error) {
            throw new RpcException(`Unable to analyze image: ${error}`);
        }
    }
}
