import { Test, TestingModule } from "@nestjs/testing";
import { DiseasesController } from "./diseases.controller";
import { DiseasesService } from "./diseases.service";
import { CreateDiseaseDto } from "./dto/create-disease.dto";
import { UpdateDiseaseDto } from "./dto/update-disease.dto";
import { GetDiseasesDto } from "./dto/get-diseases.dto";
import { createMock } from "@golevelup/ts-jest";

describe("DiseasesController", () => {
    let controller: DiseasesController;
    let service: DiseasesService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [DiseasesController],
            providers: [
                {
                    provide: DiseasesService,
                    useValue: createMock<DiseasesService>()
                }
            ]
        }).compile();

        controller = module.get<DiseasesController>(DiseasesController);
        service = module.get<DiseasesService>(DiseasesService);
    });

    describe("createDisease", () => {
        it("should call createDisease method of DiseasesService with correct parameters", async () => {
            const createDiseaseDto: CreateDiseaseDto = {
                name: "Disease 1",
                department: "Department 1",
                description: "Description 1"
            };

            controller.createDisease(createDiseaseDto);
            expect(service.createDisease).toHaveBeenCalledWith(
                createDiseaseDto
            );
        });
    });

    describe("getManyDiseases", () => {
        it("should call getManyDiseases method of DiseasesService with correct parameters", async () => {
            const getDiseasesDto: GetDiseasesDto = {
                where: {
                    name: "Disease 1"
                },
                pagination: {
                    page: 1,
                    pageSize: 10,
                    skip: 0
                }
            };

            controller.getManyDiseases(getDiseasesDto);
            expect(service.getManyDiseases).toHaveBeenCalledWith(
                getDiseasesDto.where,
                getDiseasesDto.pagination
            );
        });
    });

    describe("getAllDiseases", () => {
        it("should call getAllDiseases method of DiseasesService", async () => {
            controller.getAllDiseases();
            expect(service.getAllDiseases).toHaveBeenCalled();
        });
    });

    describe("getDisease", () => {
        it("should call getDisease method of DiseasesService with correct parameters", async () => {
            const id = 1;

            controller.getDisease(id);
            expect(service.getDisease).toHaveBeenCalledWith(id);
        });
    });

    describe("updateDisease", () => {
        it("should call updateDisease method of DiseasesService with correct parameters", async () => {
            const id = 1;
            const updateDiseaseDto: UpdateDiseaseDto = {
                name: "Updated Disease",
                description: "Updated Description"
            };

            controller.updateDisease(id, updateDiseaseDto);
            expect(service.updateDisease).toHaveBeenCalledWith(
                id,
                updateDiseaseDto
            );
        });
    });

    describe("deleteDisease", () => {
        it("should call deleteDisease method of DiseasesService with correct parameters", async () => {
            const id = 1;

            controller.deleteDisease(id);
            expect(service.deleteDisease).toHaveBeenCalledWith(id);
        });
    });
});
