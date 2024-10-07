import { Test, TestingModule } from "@nestjs/testing";
import { MedvisualApiGatewayController } from "./medvisual-api-gateway.controller";
import { MedvisualApiGatewayService } from "./medvisual-api-gateway.service";

describe("MedvisualApiGatewayController", () => {
    let medvisualApiGatewayController: MedvisualApiGatewayController;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [MedvisualApiGatewayController],
            providers: [MedvisualApiGatewayService]
        }).compile();

        medvisualApiGatewayController = app.get<MedvisualApiGatewayController>(
            MedvisualApiGatewayController
        );
    });

    describe("root", () => {
        it('should return "Hello World!"', () => {
            expect(medvisualApiGatewayController.forwardImageToHandler).toBe(
                "Hello World!"
            );
        });
    });
});
