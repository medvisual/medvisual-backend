import { Injectable } from "@nestjs/common";
import { CreateDiseaseDto } from "../../../../libs/contracts/src/diseases/dto/create-disease.dto";
import { UpdateDiseaseDto } from "../../../../libs/contracts/src/diseases/dto/update-disease.dto";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Disease } from "./entities/disease.entity";

@Injectable()
export class DiseasesService {
    constructor(
        @InjectRepository(Disease)
        private readonly diseaseRepository: Repository<Disease>
    ) {}

    async create(createDiseaseDto: CreateDiseaseDto) {
        const disease = this.diseaseRepository.create(createDiseaseDto);
        return await this.diseaseRepository.save(disease);
    }

    findAll(): Promise<Disease[]> {
        return this.diseaseRepository.find();
    }

    findOne(id: number): Promise<Disease | null> {
        return this.diseaseRepository.findOneBy({ id });
    }

    update(id: number, updateDiseaseDto: UpdateDiseaseDto) {
        return this.diseaseRepository.update(id, updateDiseaseDto);
    }

    remove(id: number) {
        return this.diseaseRepository.delete(id);
    }
}
