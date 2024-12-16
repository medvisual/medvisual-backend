import { Test, TestingModule } from "@nestjs/testing";
import { ClientProxy } from "@nestjs/microservices";
import { DiseasesService } from "./diseases.service";
import { DISEASES_CLIENT_NAME } from "./constants/constants";
import {
    DISEASES_PATTERNS,
    CreateDiseaseDto as ClientCreateDiseaseDto,
    UpdateDiseaseDto as ClientUpdateDiseaseDto
} from "@medvisual/contracts/diseases";
import { DiseaseDto } from "./dto/disease.dto";
import { PageOptionsDto, SortOrder } from "@medvisual/common/database";
import { createMock } from "@golevelup/ts-jest";

describe("DiseasesService", () => {
    let service: DiseasesService;
    let clientProxy: ClientProxy;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DiseasesService,
                {
                    provide: DISEASES_CLIENT_NAME,
                    useValue: createMock<ClientProxy>()
                }
            ]
        }).compile();

        service = module.get<DiseasesService>(DiseasesService);
        clientProxy = module.get<ClientProxy>(DISEASES_CLIENT_NAME);
    });

    describe("createDisease", () => {
        it("should call send method of ClientProxy with correct arguments", () => {
            const createDiseaseDto: ClientCreateDiseaseDto = {
                name: "Disease 1",
                department: "Department 1",
                description: "Description 1"
            };
            service.createDisease(createDiseaseDto);
            expect(clientProxy.send).toHaveBeenCalledWith(
                DISEASES_PATTERNS.CREATE,
                createDiseaseDto
            );
        });
    });

    describe("getManyDiseases", () => {
        it("should call send method of ClientProxy with correct arguments", () => {
            const where: Partial<DiseaseDto> = {
                name: "Disease 1"
            };
            const pagination: PageOptionsDto = {
                page: 1,
                pageSize: 10,
                orderBy: "id",
                sortOrder: SortOrder.ASCENDING,
                skip: 0
            };

            service.getManyDiseases(where, pagination);
            expect(clientProxy.send).toHaveBeenCalledWith(
                DISEASES_PATTERNS.FIND_MANY,
                { where, pagination }
            );
        });
    });

    describe("getAllDiseases", () => {
        it("should call send method of ClientProxy with correct arguments", () => {
            service.getAllDiseases();
            expect(clientProxy.send).toHaveBeenCalledWith(
                DISEASES_PATTERNS.FIND_ALL,
                {}
            );
        });
    });

    describe("getDisease", () => {
        it("should call send method of ClientProxy with correct arguments", () => {
            const id = 1;

            service.getDisease(id);
            expect(clientProxy.send).toHaveBeenCalledWith(
                DISEASES_PATTERNS.FIND_ONE,
                id
            );
        });
    });

    describe("updateDisease", () => {
        it("should call send method of ClientProxy with correct arguments", () => {
            const id = 1;
            const updateDiseaseDto: ClientUpdateDiseaseDto = {
                id,
                name: "Updated Disease",
                description: "Updated Description"
            };

            service.updateDisease(id, updateDiseaseDto);
            expect(clientProxy.send).toHaveBeenCalledWith(
                DISEASES_PATTERNS.UPDATE,
                { id, ...updateDiseaseDto }
            );
        });
    });

    describe("deleteDisease", () => {
        it("should call send method of ClientProxy with correct arguments", () => {
            const id = 1;

            service.deleteDisease(id);
            expect(clientProxy.send).toHaveBeenCalledWith(
                DISEASES_PATTERNS.REMOVE,
                id
            );
        });
    });
});
