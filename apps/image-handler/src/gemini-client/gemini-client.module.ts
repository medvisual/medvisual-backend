import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { GeminiClientService } from "./gemini-client.service";

@Module({
    imports: [ConfigModule],
    providers: [GeminiClientService],
    exports: [GeminiClientService]
})
export class GeminiClientModule {}
