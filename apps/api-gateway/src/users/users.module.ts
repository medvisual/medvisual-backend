import { Module } from "@nestjs/common";

import { UsersService } from "./users.service";
import { USERS_CLIENT_NAME } from "./constants/constants";
import { UsersController } from "./users.controller";
import { RmqModule } from "@medvisual/common/rmq";
import { USERS_SERVICE_NAME } from "@medvisual/contracts/users";

@Module({
    imports: [
        RmqModule.register({
            clientName: USERS_CLIENT_NAME,
            serviceName: USERS_SERVICE_NAME
        })
    ],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService]
})
export class UsersModule {}
