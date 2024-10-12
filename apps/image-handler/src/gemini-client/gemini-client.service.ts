import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleAIFileManager } from "@google/generative-ai/server";
import { consola } from "consola";
import { ImageUploadDto } from "../dto/image-upload.dto";

@Injectable()
export class GeminiClientService {
    public constructor(private configService: ConfigService) {}

    private readonly ai = new GoogleGenerativeAI(
        this.configService.get<string>("GEMINI_API_KEY")
    );
    private readonly model = this.ai.getGenerativeModel({
        model: this.configService.get<string>("GEMINI_MODEL")
    });
    private readonly fileManager = new GoogleAIFileManager(
        this.configService.get<string>("GEMINI_API_KEY")
    );
    private readonly baseDiseaseImagePrompt = this.configService.get<string>(
        "BASE_DISEASE_IMAGE_PROMPT"
    );

    async getDiseaseInfoFromImage(imageUploadDto: ImageUploadDto) {
        const prompt: string =
            this.baseDiseaseImagePrompt + imageUploadDto.data.diseaseCategory;

        try {
            // Test values
            const uploadResult = await this.fileManager.uploadFile(
                imageUploadDto.image.path,
                {
                    mimeType: imageUploadDto.image.mimetype,
                    displayName: "image"
                }
            );
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
            consola.info(result.response.text());
            return result.response.text();
        } catch (error) {
            consola.error(error);
        }
    }
}
