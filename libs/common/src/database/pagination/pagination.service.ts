import { FindOptionsWhere, Repository } from "typeorm";
import { PageOptionsDto } from "./dto/page-options.dto";
import { PageMetaDto } from "./dto/page-meta.dto";
import { PageDto } from "./dto/page.dto";

export class PaginationService {
    protected async paginate<T>(
        repository: Repository<T>,
        pageOptionsDto: PageOptionsDto,
        findOptions?: FindOptionsWhere<T>
    ): Promise<PageDto<T>> {
        const queryBuilder = repository.createQueryBuilder();

        queryBuilder
            .skip(pageOptionsDto.skip)
            .take(pageOptionsDto.pageSize)
            .orderBy(pageOptionsDto.orderBy, pageOptionsDto.sortOrder);

        if (findOptions) {
            queryBuilder.where(findOptions);
        }

        const itemCount = await queryBuilder.getCount();
        const { entities } = await queryBuilder.getRawAndEntities();

        const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

        return new PageDto(entities, pageMetaDto);
    }
}
