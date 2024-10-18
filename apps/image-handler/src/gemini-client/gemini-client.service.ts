import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleAIFileManager } from "@google/generative-ai/server";
import { consola } from "consola";
import { resolve } from "path";
import * as fs from "node:fs";

import { ImageUploadDto } from "@medvisual/contracts/image-handler";
import { GeminiVerdictDto } from "@medvisual/contracts/image-handler/dto/gemini-verdict.dto";
import { diseaseImageSchema } from "./schemas/gemini-client.schemas";

@Injectable()
export class GeminiClientService {
    public constructor(private configService: ConfigService) {}

    private readonly imageUploadFolder = this.configService.get<string>(
        "IMAGE_UPLOAD_FOLDER"
    );
    private readonly ai = new GoogleGenerativeAI(
        this.configService.get<string>("GEMINI_API_KEY")
    );
    private readonly model = this.ai.getGenerativeModel({
        model: this.configService.get<string>("GEMINI_MODEL"),
        generationConfig: {
            responseMimeType: "application/json",
            responseSchema: diseaseImageSchema
        }
    });
    private readonly fileManager = new GoogleAIFileManager(
        this.configService.get<string>("GEMINI_API_KEY")
    );
    private readonly baseDiseaseImagePrompt = this.configService.get<string>(
        "BASE_DISEASE_IMAGE_PROMPT"
    );

    async getDiseaseInfoFromImage(
        imageUploadDto: ImageUploadDto
    ): Promise<GeminiVerdictDto> {
        const prompt: string =
            this.baseDiseaseImagePrompt + imageUploadDto.data.diseaseCategory;

        try {
            // Ideally, this should be substituted with a CDN
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
            // TODO: Implement exception filter instead?
            consola.error(error);
        }
    }
}
