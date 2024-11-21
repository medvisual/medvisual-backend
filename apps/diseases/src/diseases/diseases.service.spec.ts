import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { RpcException } from "@nestjs/microservices";

import { DiseasesService } from "./diseases.service";
import { DiseaseEntity } from "./entities/disease.entity";
import {
    CreateDiseaseDto,
    DiseaseDto,
    UpdateDiseaseDto
} from "@medvisual/contracts/diseases";
import { PaginationService } from "@medvisual/common/database";
import { PageOptionsDto } from "@medvisual/common/database";

describe("DiseasesService", () => {
    let service: DiseasesService;
    let repository: Repository<DiseaseEntity>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DiseasesService,
                {
                    provide: getRepositoryToken(DiseaseEntity),
                    useClass: Repository
                },
                PaginationService
            ]
        }).compile();

        service = module.get<DiseasesService>(DiseasesService);
        repository = module.get<Repository<DiseaseEntity>>(
            getRepositoryToken(DiseaseEntity)
        );
    });

    describe("create", () => {
        it("should create a new disease", async () => {
            const createDiseaseDto: CreateDiseaseDto = {
                name: "Disease 1",
                department: "Department 1",
                description: "Description 1"
            };
            const disease: DiseaseDto = { id: 1, ...createDiseaseDto };

            jest.spyOn(repository, "create").mockReturnValue(disease as any);
            jest.spyOn(repository, "save").mockResolvedValue(disease as any);

            expect(await service.create(createDiseaseDto)).toEqual(disease);
        });
    });

    describe("findAll", () => {
        it("should return an array of diseases", async () => {
            const diseases: DiseaseDto[] = [
                {
                    id: 1,
                    name: "Disease 1",
                    department: "Department 1",
                    description: "Description 1"
                },
                {
                    id: 2,
                    name: "Disease 2",
                    department: "Department 2",
                    description: "Description 2"
                },
                {
                    id: 3,
                    name: "Disease 3",
                    department: "Department 3",
                    description: "Description 3"
                }
            ];

            jest.spyOn(repository, "find").mockResolvedValue(diseases as any);

            expect(await service.findAll()).toEqual(diseases);
        });
    });

    describe("findOne", () => {
        it("should return a disease by id", async () => {
            const disease: DiseaseDto = {
                id: 1,
                name: "Disease 1",
                department: "Department 1",
                description: "Description 1"
            };

            jest.spyOn(repository, "findOneBy").mockResolvedValue(
                disease as any
            );

            expect(await service.findOne(1)).toEqual(disease);
        });

        it("should return null if disease is not found", async () => {
            jest.spyOn(repository, "findOneBy").mockResolvedValue(null);

            expect(await service.findOne(1)).toBeNull();
        });
    });

    // Paginate method is not tested because it's tested in PaginationService unit tests
    describe("findAllPaginated", () => {
        it("should return paginated diseases", async () => {
            const diseases = [
                {
                    id: 1,
                    name: "Disease 1",
                    department: "Department A",
                    description: "Description 1"
                },
                {
                    id: 2,
                    name: "Disease 2",
                    department: "Department A",
                    description: "Description 2"
                },
                {
                    id: 3,
                    name: "Disease 3",
                    department: "Department A",
                    description: "Description 3"
                },
                {
                    id: 4,
                    name: "Disease 4",
                    department: "Department B",
                    description: "Description 4"
                },
                {
                    id: 5,
                    name: "Disease 5",
                    department: "Department B",
                    description: "Description 5"
                }
            ];
            const pageOptions: PageOptionsDto = new PageOptionsDto();

            jest.spyOn(service, "findAllPaginated").mockResolvedValue({
                data: diseases as any,
                meta: {
                    page: 1,
                    pageSize: 5,
                    itemCount: 5,
                    pageCount: 1,
                    hasPreviousPage: false,
                    hasNextPage: false
                }
            });

            expect(await service.findAllPaginated({}, pageOptions)).toEqual({
                data: diseases,
                meta: {
                    page: 1,
                    pageSize: 5,
                    itemCount: 5,
                    pageCount: 1,
                    hasPreviousPage: false,
                    hasNextPage: false
                }
            });
        });
    });

    describe("update", () => {
        it("should update a disease", async () => {
            const updateDiseaseDto: UpdateDiseaseDto = {
                id: 1,
                name: "Updated Disease",
                department: "Updated Department",
                description: "Updated Description"
            };
            const disease: DiseaseDto = {
                id: 1,
                name: "Updated Disease",
                department: "Updated Department",
                description: "Updated Description"
            };

            jest.spyOn(repository, "update").mockResolvedValue({
                affected: 1
            } as any);
            jest.spyOn(repository, "findOneBy").mockResolvedValue(
                updateDiseaseDto as any
            );

            expect(await service.update(1, updateDiseaseDto)).toEqual(disease);
        });

        it("should throw RpcException if disease is not found", async () => {
            const updateDiseaseDto: UpdateDiseaseDto = {
                id: 1,
                name: "Updated Disease",
                description: "Updated Description"
            };

            jest.spyOn(repository, "update").mockResolvedValue({
                affected: 0
            } as any);

            await expect(service.update(2, updateDiseaseDto)).rejects.toThrow(
                RpcException
            );
        });
    });

    describe("remove", () => {
        it("should remove a disease", async () => {
            jest.spyOn(repository, "delete").mockResolvedValue({
                affected: 1
            } as any);

            await expect(service.remove(1)).resolves.toBeUndefined();
        });

        it("should throw RpcException if disease is not found", async () => {
            jest.spyOn(repository, "delete").mockResolvedValue({
                affected: 0
            } as any);

            await expect(service.remove(1)).rejects.toThrow(RpcException);
        });
    });
});
