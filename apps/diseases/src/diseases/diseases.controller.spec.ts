import { Test, TestingModule } from "@nestjs/testing";
import { DiseasesController } from "./diseases.controller";
import { DiseasesService } from "./diseases.service";
import {
    CreateDiseaseDto,
    UpdateDiseaseDto,
    GetDiseasesDto,
    DiseaseDto
} from "@medvisual/contracts/diseases";
import { PageDto, PageOptionsDto } from "@medvisual/common/database";
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

    describe("create", () => {
        it("should call diseasesService.create() with the correct parameters", async () => {
            const createDiseaseDto: CreateDiseaseDto = {
                name: "Disease 1",
                department: "Department 1",
                description: "Description 1"
            };
            const result = { id: 1, ...createDiseaseDto };

            jest.spyOn(service, "create").mockResolvedValue(result as any);

            expect(await controller.create(createDiseaseDto)).toEqual(result);
            expect(service.create).toHaveBeenCalledWith(createDiseaseDto);
        });
    });

    describe("findAll", () => {
        it("should call diseasesService.findAll() and return the result", async () => {
            const result = [
                { id: 1, name: "Disease 1", description: "Description 1" }
            ];

            jest.spyOn(service, "findAll").mockResolvedValue(result as any);

            expect(await controller.findAll()).toEqual(result);
            expect(service.findAll).toHaveBeenCalled();
        });
    });

    describe("findOne", () => {
        it("should call diseasesService.findOne() with the correct parameters", async () => {
            const result = {
                id: 1,
                name: "Disease 1",
                description: "Description 1"
            };

            jest.spyOn(service, "findOne").mockResolvedValue(result as any);

            expect(await controller.findOne(1)).toEqual(result);
            expect(service.findOne).toHaveBeenCalledWith(1);
        });
    });

    describe("findAllPaginated", () => {
        it("should call diseasesService.findAllPaginated() with the correct parameters", async () => {
            const findDiseasesDto: GetDiseasesDto = {
                where: {
                    name: "Disease 1"
                },
                pagination: new PageOptionsDto()
            };
            const result: PageDto<DiseaseDto> = {
                data: [
                    {
                        id: 1,
                        name: "Disease 1",
                        department: "Department 1",
                        description: "Description 1"
                    }
                ],
                meta: {
                    page: 1,
                    pageSize: 10,
                    itemCount: 10,
                    pageCount: 1,
                    hasPreviousPage: false,
                    hasNextPage: false
                }
            };

            jest.spyOn(service, "findAllPaginated").mockResolvedValue(
                result as any
            );

            expect(await controller.findAllPaginated(findDiseasesDto)).toEqual(
                result
            );
            expect(service.findAllPaginated).toHaveBeenCalledWith(
                findDiseasesDto.where,
                findDiseasesDto.pagination
            );
        });
    });

    describe("update", () => {
        it("should call diseasesService.update() with the correct parameters", async () => {
            const updateDiseaseDto: UpdateDiseaseDto = {
                id: 1,
                name: "Updated Disease",
                description: "Updated Description"
            };
            const result = { id: 1, ...updateDiseaseDto };

            jest.spyOn(service, "update").mockResolvedValue(result as any);

            expect(await controller.update(updateDiseaseDto)).toEqual(result);
            expect(service.update).toHaveBeenCalledWith(
                updateDiseaseDto.id,
                updateDiseaseDto
            );
        });
    });

    describe("remove", () => {
        it("should call diseasesService.remove() with the correct parameters", async () => {
            const result = {
                id: 1,
                name: "Disease 1",
                description: "Description 1"
            };

            jest.spyOn(service, "remove").mockResolvedValue(result as any);

            expect(await controller.remove(1)).toEqual(result);
            expect(service.remove).toHaveBeenCalledWith(1);
        });
    });
});
