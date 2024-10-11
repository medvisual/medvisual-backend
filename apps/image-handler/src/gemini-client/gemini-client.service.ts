import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleAIFileManager } from "@google/generative-ai/server";
import { consola } from "consola";

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

    async makeRequest(diseaseCategory: string) {
        const prompt: string = this.baseDiseaseImagePrompt + diseaseCategory;

        try {
            // Test values
            const uploadResult = await this.fileManager.uploadFile(
                `D:/medvisual-backend/reqs/testxray.jpg`,
                {
                    mimeType: "image/jpeg",
                    displayName: "x-ray image"
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
