import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";

import { DISEASES_CLIENT } from "./constants/constants";
import {
    DISEASES_PATTERNS,
    CreateDiseaseDto as ClientCreateDiseaseDto,
    UpdateDiseaseDto as ClientUpdateDiseaseDto
} from "@medvisual/contracts/diseases";
import { lastValueFrom } from "rxjs";

@Injectable()
export class DiseasesService {
    constructor(
        @Inject(DISEASES_CLIENT)
        private readonly diseasesClient: ClientProxy
    ) {}

    // TODO: Return the disease or something

    createDisease(createDiseaseDto: ClientCreateDiseaseDto) {
        return this.diseasesClient.send<unknown, ClientCreateDiseaseDto>(
            DISEASES_PATTERNS.CREATE,
            createDiseaseDto
        );
    }

    async getDiseases() {
        return await lastValueFrom(
            this.diseasesClient.send(DISEASES_PATTERNS.FIND_ALL, {})
        );
    }

    getDisease(id: number) {
        return this.diseasesClient.send<unknown, number>(
            DISEASES_PATTERNS.FIND_ONE,
            id
        );
    }

    updateDisease(updateDiseaseDto: ClientUpdateDiseaseDto) {
        return this.diseasesClient.send<unknown, ClientUpdateDiseaseDto>(
            DISEASES_PATTERNS.UPDATE,
            updateDiseaseDto
        );
    }

    deleteDisease(id: number) {
        return this.diseasesClient.send<unknown, number>(
            DISEASES_PATTERNS.REMOVE,
            id
        );
    }
}
