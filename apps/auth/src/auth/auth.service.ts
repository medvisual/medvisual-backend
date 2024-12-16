import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy, RpcException } from "@nestjs/microservices";
import * as bcrypt from "bcryptjs";
import { JwtService } from "@nestjs/jwt";
import { lastValueFrom } from "rxjs";
import { ConfigService } from "@nestjs/config";

import { USERS_CLIENT_NAME } from "../constants/constants";
import {
    UserDto as ClientUserDto,
    CreateUserDto as ClientCreateUserDto,
    FindOneUserDto as ClientFindOneUserDto,
    USERS_PATTERNS
} from "@medvisual/contracts/users";
import { TokenPairDto, TokenPayload } from "@medvisual/contracts/auth";
import { SignUpDto } from "@medvisual/contracts/auth/dto/sign-up.dto";

@Injectable()
export class AuthService {
    constructor(
        @Inject(USERS_CLIENT_NAME)
        private readonly usersClient: ClientProxy,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ) {}

    async validateUserCredentials(
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

    async signUp(signUpDto: SignUpDto): Promise<ClientUserDto> {
        const { password, ...data } = signUpDto;
        const createUserDto: ClientCreateUserDto = {
            password: await bcrypt.hash(password, 10),
            ...data
        };

        return await lastValueFrom(
            this.usersClient.send<ClientUserDto, ClientCreateUserDto>(
                USERS_PATTERNS.CREATE,
                createUserDto
            )
        );
    }

    async generateTokens(tokenPayload: TokenPayload): Promise<TokenPairDto> {
        // Default configuration from the module is used for the access token
        const accessToken = this.jwtService.sign(tokenPayload);
        const refreshToken = this.jwtService.sign(tokenPayload, {
            secret: this.configService.getOrThrow<string>("jwt.refresh.secret"),
            expiresIn: this.configService.getOrThrow<string>(
                "jwt.refresh.expiresInSeconds"
            )
        });

        return { accessToken, refreshToken };
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
