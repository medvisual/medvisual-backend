import { Module } from "@nestjs/common";
import { GeminiClientService } from "./gemini-client.service";
import { ConfigModule } from "@nestjs/config";

@Module({
    imports: [ConfigModule],
    providers: [GeminiClientService],
    exports: [GeminiClientService]
})
export class GeminiClientModule {}
