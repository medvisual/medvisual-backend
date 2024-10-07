import { Test, TestingModule } from "@nestjs/testing";
import { ImageHandlerController } from "./image-handler.controller";

describe("ImageHandlerController", () => {
    let controller: ImageHandlerController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ImageHandlerController]
        }).compile();

        controller = module.get<ImageHandlerController>(ImageHandlerController);
    });

    it("should be defined", () => {
        expect(controller).toBeDefined();
    });
});
