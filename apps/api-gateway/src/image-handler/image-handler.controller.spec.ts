import { Test } from "@nestjs/testing";
import { createMock, DeepMocked } from "@golevelup/ts-jest";
import { ApiGatewayController } from "./api-gateway.controller";
import { ApiGatewayService } from "./api-gateway.service";
import { ImageVerdictsDto } from "./image-handler/dto/image-verdicts.dto";
import { DiseasesInfoDto } from "./image-handler/dto/diseases-info.dto";
import { BadRequestException } from "@nestjs/common";

describe("ApiGatewayController", () => {
    let apiGatewayController: ApiGatewayController;
    let apiGatewayService: DeepMocked<ApiGatewayService>;

    let imageData: Express.Multer.File;
    let diseasesInfoDto: DiseasesInfoDto;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            controllers: [ApiGatewayController],
            providers: [
                {
                    provide: ApiGatewayService,
                    useValue: createMock<ApiGatewayService>()
                }
            ]
        }).compile();

        apiGatewayService = await moduleRef.resolve(ApiGatewayService);
        apiGatewayController = await moduleRef.resolve(ApiGatewayController);

        imageData = createMock<Express.Multer.File>();
        diseasesInfoDto = createMock<DiseasesInfoDto>();
    });

    describe("analyzeImage", () => {
        it("should return a ImageVerdictsDto", async () => {
            const result: ImageVerdictsDto = {
                verdicts: [
                    {
                        disease: "Disease 1",
                        probability: 0.7,
                        verdict: "Test",
                        advice: "Test"
                    }
                ]
            };
            jest.spyOn(
                apiGatewayService,
                "forwardImageToHandler"
            ).mockImplementation(async () => result);

            expect(
                apiGatewayController.analyzeImage(imageData, diseasesInfoDto)
            ).resolves.toBe(result);
        });

        it("should return 400 if the diseasesInfo input isn't correct", async () => {
            jest.spyOn(
                apiGatewayService,
                "forwardImageToHandler"
            ).mockImplementation(async () => createMock<ImageVerdictsDto>());
            const incorrectDiseasesInfo = {
                presumedDiseases: null
            };

            expect(
                apiGatewayController.analyzeImage(
                    imageData,
                    incorrectDiseasesInfo
                )
            ).rejects.toThrow(BadRequestException);
        });
    });
});
