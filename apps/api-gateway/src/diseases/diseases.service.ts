import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";

import { DISEASES_CLIENT_NAME } from "./constants/constants";
import {
    DISEASES_PATTERNS,
    CreateDiseaseDto as ClientCreateDiseaseDto,
    UpdateDiseaseDto as ClientUpdateDiseaseDto,
    DiseaseDto as ClientDiseaseDto
} from "@medvisual/contracts/diseases";
import { UpdateDiseaseDto } from "./dto/update-disease.dto";

@Injectable()
export class DiseasesService {
    constructor(
        @Inject(DISEASES_CLIENT_NAME)
        private readonly diseasesClient: ClientProxy
    ) {}

    createDisease(createDiseaseDto: ClientCreateDiseaseDto) {
        return this.diseasesClient.send<
            ClientDiseaseDto,
            ClientCreateDiseaseDto
        >(DISEASES_PATTERNS.CREATE, createDiseaseDto);
    }

    getDiseases() {
        return this.diseasesClient.send<ClientDiseaseDto[]>(
            DISEASES_PATTERNS.FIND_ALL,
            {}
        );
    }

    getDisease(id: number) {
        return this.diseasesClient.send<ClientDiseaseDto, number>(
            DISEASES_PATTERNS.FIND_ONE,
            id
        );
    }

    updateDisease(id: number, data: UpdateDiseaseDto) {
        return this.diseasesClient.send<
            ClientDiseaseDto,
            ClientUpdateDiseaseDto
        >(DISEASES_PATTERNS.UPDATE, {
            id,
            ...data
        });
    }

    deleteDisease(id: number) {
        return this.diseasesClient.send<void, number>(
            DISEASES_PATTERNS.REMOVE,
            id
        );
    }
}
