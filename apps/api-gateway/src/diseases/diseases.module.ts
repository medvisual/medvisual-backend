import { Module } from "@nestjs/common";

import { DiseasesService } from "./diseases.service";
import { DISEASES_CLIENT_NAME } from "./constants/constants";
import { DiseasesController } from "./diseases.controller";
import { RmqModule } from "@medvisual/common/rmq";
import { DISEASES_SERVICE_NAME } from "@medvisual/contracts/diseases";

@Module({
    imports: [
        RmqModule.register({
            clientName: DISEASES_CLIENT_NAME,
            serviceName: DISEASES_SERVICE_NAME
        })
    ],
    controllers: [DiseasesController],
    providers: [DiseasesService]
})
export class DiseasesModule {}
