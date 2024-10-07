import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { MedvisualApiGatewayModule } from "./../src/medvisual-api-gateway.module";

describe("MedvisualApiGatewayController (e2e)", () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [MedvisualApiGatewayModule]
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it("/ (GET)", () => {
        return request(app.getHttpServer())
            .get("/")
            .expect(200)
            .expect("Hello World!");
    });
});
