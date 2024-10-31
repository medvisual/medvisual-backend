import { Module } from "@nestjs/common";

import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { RmqModule } from "@medvisual/common/rmq";
import { AUTH_CLIENT_NAME } from "./constants/constants";
import { AUTH_SERVICE_NAME } from "@medvisual/contracts/auth";
import { LocalStrategy } from "./strategies/local.strategy";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { UsersModule } from "../users/users.module";
import { JwtRefreshStrategy } from "./strategies/jwt-refresh.strategy";

@Module({
    imports: [
        RmqModule.register({
            clientName: AUTH_CLIENT_NAME,
            serviceName: AUTH_SERVICE_NAME
        }),
        UsersModule
    ],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, JwtStrategy, JwtRefreshStrategy]
})
export class AuthModule {}
