import { Test, TestingModule } from "@nestjs/testing";
import { ImageHandlerService } from "./image-handler.service";

describe("ImageHandlerService", () => {
    let service: ImageHandlerService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ImageHandlerService]
        }).compile();

        service = module.get<ImageHandlerService>(ImageHandlerService);
    });

    it("should be defined", () => {
        expect(service).toBeDefined();
    });
});
