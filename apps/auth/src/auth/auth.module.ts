import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

import { USERS_CLIENT_NAME } from "../constants/constants";
import { RmqModule } from "@medvisual/common/rmq";
import { USERS_SERVICE_NAME } from "@medvisual/contracts/users";
import { AuthController } from "./auth.controller";
import { RefreshTokenBlacklistService } from "./refresh-token-blacklist.service";
import { BlacklistedRefreshToken } from "./entities/blacklisted-refresh-token.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([BlacklistedRefreshToken]),
        RmqModule.register({
            clientName: USERS_CLIENT_NAME,
            serviceName: USERS_SERVICE_NAME
        }),
        JwtModule.registerAsync({
            useFactory: (configService: ConfigService) => ({
                global: true,
                secret: configService.getOrThrow<string>("jwt.access.secret"),
                signOptions: {
                    expiresIn: configService.getOrThrow<string>(
                        "jwt.access.expiresInSeconds"
                    )
                }
            }),
            inject: [ConfigService]
        })
    ],
    controllers: [AuthController],
    providers: [AuthService, RefreshTokenBlacklistService]
})
export class AuthModule {}
