import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy, RpcException } from "@nestjs/microservices";
import * as bcrypt from "bcryptjs";
import { JwtService, JwtSignOptions } from "@nestjs/jwt";
import { lastValueFrom } from "rxjs";
import { ConfigService } from "@nestjs/config";

import { USERS_CLIENT_NAME } from "./constants/constants";
import {
    UpdateUserDto as ClientUpdateUserDto,
    UserDto as ClientUserDto,
    FindOneUserDto as ClientFindOneUserDto,
    USERS_PATTERNS
} from "@medvisual/contracts/users";
import { ITokenPayload } from "@medvisual/contracts/auth";

@Injectable()
export class AuthService {
    constructor(
        @Inject(USERS_CLIENT_NAME)
        private readonly usersClient: ClientProxy,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ) {}

    async validateUser(
        email: string,
        password: string
    ): Promise<ClientUserDto> {
        let user: ClientUserDto;
        try {
            // Users microservice will also throw an error if the user is not found
            user = await this.getUserBy({ email });

            const isAuthenticated = await bcrypt.compare(
                password,
                user.password
            );
            if (!isAuthenticated) {
                throw new RpcException("Invalid password");
            }
        } catch (error) {
            throw new RpcException("Invalid credentials");
        }

        return user;
    }

    async generateAuth(tokenPayload: ITokenPayload) {
        const accessToken = this.issueToken(tokenPayload, {
            secret: this.configService.getOrThrow<string>("jwt.access.secret"),
            expiresIn: this.configService.getOrThrow<string>(
                "jwt.access.expiresInSeconds"
            )
        });
        const refreshToken = this.issueToken(tokenPayload, {
            secret: this.configService.getOrThrow<string>("jwt.refresh.secret"),
            expiresIn: this.configService.getOrThrow<string>(
                "jwt.refresh.expiresInSeconds"
            )
        });

        // TODO: Implement token rotation
        await lastValueFrom(
            this.usersClient.send<ClientUserDto, ClientUpdateUserDto>(
                USERS_PATTERNS.UPDATE,
                {
                    id: tokenPayload.userId,
                    refreshToken
                }
            )
        );

        return { accessToken, refreshToken };
    }

    async validateRefreshToken(
        refreshToken: string,
        tokenPayload: ITokenPayload
    ) {
        const user = await this.getUserBy({ id: tokenPayload.userId });

        // TODO: Implement token rotation
        return refreshToken === user.refreshToken;
    }

    private issueToken(
        tokenPayload: ITokenPayload,
        signOptions?: JwtSignOptions
    ) {
        return this.jwtService.sign(tokenPayload, signOptions);
    }

    private async getUserBy(
        options: Partial<ClientUserDto>
    ): Promise<ClientUserDto> {
        return await lastValueFrom(
            this.usersClient.send<ClientUserDto, ClientFindOneUserDto>(
                USERS_PATTERNS.FIND_ONE,
                options
            )
        );
    }
}
