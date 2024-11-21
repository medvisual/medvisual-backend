import { Test, TestingModule } from "@nestjs/testing";
import { FindOptionsWhere, Repository } from "typeorm";
import { PaginationService } from "./pagination.service";
import { PageOptionsDto } from "./dto/page-options.dto";
import { PageDto } from "./dto/page.dto";
import { SortOrder } from "../enums/sort-order.enum";

class TestPaginationService extends PaginationService {
    public async testPaginate<T>(
        repository: Repository<T>,
        pageOptionsDto: PageOptionsDto,
        findOptions?: FindOptionsWhere<T>
    ): Promise<PageDto<T>> {
        return this.paginate(repository, pageOptionsDto, findOptions);
    }
}

class TestEntity {
    id: number;
    name: string;
}

describe("PaginationService", () => {
    let service: TestPaginationService;
    let repository: Repository<any>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                TestPaginationService,
                {
                    provide: "Repository",
                    useClass: Repository
                }
            ]
        }).compile();

        service = module.get<TestPaginationService>(TestPaginationService);
        repository = module.get<Repository<unknown>>("Repository");
    });

    describe("paginate", () => {
        it("should paginate results", async () => {
            const pageOptionsDto: PageOptionsDto = {
                page: 1,
                pageSize: 10,
                orderBy: "id",
                sortOrder: SortOrder.ASCENDING,
                skip: 0
            };

            const items: TestEntity[] = [
                {
                    id: 1,
                    name: "Test 1"
                },
                {
                    id: 2,
                    name: "Test 2"
                }
            ];
            const itemCount = items.length;

            jest.spyOn(repository, "createQueryBuilder").mockReturnValue({
                skip: jest.fn().mockReturnThis(),
                take: jest.fn().mockReturnThis(),
                orderBy: jest.fn().mockReturnThis(),
                where: jest.fn().mockReturnThis(),
                getCount: jest.fn().mockResolvedValue(itemCount),
                getRawAndEntities: jest
                    .fn()
                    .mockResolvedValue({ entities: items })
            } as any);

            const result = await service.testPaginate<TestEntity>(
                repository,
                pageOptionsDto
            );

            expect(result).toEqual({
                data: items,
                meta: {
                    page: pageOptionsDto.page,
                    pageCount: Math.ceil(itemCount / pageOptionsDto.pageSize),
                    pageSize: pageOptionsDto.pageSize,
                    itemCount: itemCount,
                    hasPreviousPage: pageOptionsDto.page > 1,
                    hasNextPage:
                        pageOptionsDto.page <
                        Math.ceil(itemCount / pageOptionsDto.pageSize)
                }
            } as PageDto<TestEntity>);
        });

        it("should paginate results with findOptions", async () => {
            const pageOptionsDto: PageOptionsDto = {
                page: 1,
                pageSize: 2,
                orderBy: "id",
                sortOrder: SortOrder.ASCENDING,
                skip: 0
            };

            const items: TestEntity[] = [
                {
                    id: 1,
                    name: "Test 1"
                },
                {
                    id: 2,
                    name: "Test 2"
                }
            ];
            const itemCount = items.length;
            const findOptions: FindOptionsWhere<TestEntity> = {
                name: "Test 2"
            };

            jest.spyOn(repository, "createQueryBuilder").mockReturnValue({
                skip: jest.fn().mockReturnThis(),
                take: jest.fn().mockReturnThis(),
                orderBy: jest.fn().mockReturnThis(),
                where: jest.fn().mockReturnThis(),
                getCount: jest.fn().mockResolvedValue(itemCount),
                getRawAndEntities: jest.fn().mockResolvedValue({
                    entities: items.filter((i) => i.name === findOptions.name)
                })
            } as any);

            const result = await service.testPaginate(
                repository,
                pageOptionsDto,
                findOptions
            );

            expect(result).toEqual({
                data: items.filter((i) => i.name === findOptions.name),
                meta: {
                    page: pageOptionsDto.page,
                    pageCount: Math.ceil(itemCount / pageOptionsDto.pageSize),
                    pageSize: pageOptionsDto.pageSize,
                    itemCount: itemCount,
                    hasPreviousPage: pageOptionsDto.page > 1,
                    hasNextPage:
                        pageOptionsDto.page <
                        Math.ceil(itemCount / pageOptionsDto.pageSize)
                }
            } as PageDto<TestEntity>);
        });
    });
});
