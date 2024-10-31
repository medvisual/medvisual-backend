import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { RpcException } from "@nestjs/microservices";

import { CreateDiseaseDto } from "@medvisual/contracts/diseases";
import { UpdateDiseaseDto } from "@medvisual/contracts/diseases";
import { Disease } from "./entities/disease.entity";

@Injectable()
export class DiseasesService {
    constructor(
        @InjectRepository(Disease)
        private readonly diseaseRepository: Repository<Disease>
    ) {}

    create(createDiseaseDto: CreateDiseaseDto) {
        const disease = this.diseaseRepository.create(createDiseaseDto);
        return this.diseaseRepository.save(disease);
    }

    findAll() {
        return this.diseaseRepository.find();
    }

    findOne(id: number): Promise<Disease | null> {
        return this.diseaseRepository.findOneBy({ id });
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
