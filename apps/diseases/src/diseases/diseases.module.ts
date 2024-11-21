import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { DiseasesService } from "./diseases.service";
import { DiseasesController } from "./diseases.controller";
import { DiseaseEntity } from "./entities/disease.entity";

@Module({
    imports: [TypeOrmModule.forFeature([DiseaseEntity])],
    controllers: [DiseasesController],
    providers: [DiseasesService]
})
export class DiseasesModule {}
