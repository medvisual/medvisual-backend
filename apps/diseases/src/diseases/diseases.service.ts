import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { RpcException } from "@nestjs/microservices";

import { CreateDiseaseDto } from "@medvisual/contracts/diseases";
import { UpdateDiseaseDto } from "@medvisual/contracts/diseases";
import { DiseaseEntity } from "./entities/disease.entity";
import { PaginationService } from "@medvisual/common/database";
import { PageOptionsDto } from "@medvisual/common/database";

@Injectable()
export class DiseasesService extends PaginationService {
    constructor(
        @InjectRepository(DiseaseEntity)
        private readonly diseaseRepository: Repository<DiseaseEntity>
    ) {
        super();
    }

    create(createDiseaseDto: CreateDiseaseDto) {
        const disease = this.diseaseRepository.create(createDiseaseDto);
        return this.diseaseRepository.save(disease);
    }

    findAll() {
        return this.diseaseRepository.find();
    }

    findOne(id: number): Promise<DiseaseEntity | null> {
        return this.diseaseRepository.findOneBy({ id });
    }

    async findAllPaginated(
        where?: Partial<DiseaseEntity>,
        pageOptions?: PageOptionsDto
    ) {
        return await this.paginate<DiseaseEntity>(
            this.diseaseRepository,
            pageOptions,
            where
        );
    }

    async update(id: number, updateDiseaseDto: UpdateDiseaseDto) {
        // Id is a primary key, so it won't be updated anyway
        const result = await this.diseaseRepository.update(
            id,
            updateDiseaseDto
        );
        if (result.affected === 0) {
            throw new RpcException("Disease not found");
        }

        return this.findOne(id);
    }

    async remove(id: number) {
        const result = await this.diseaseRepository.delete(id);
        if (result.affected === 0) {
            throw new RpcException("Disease not found");
        }
    }
}
