import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";

import { AUTH_CLIENT_NAME } from "./constants/constants";
import {
    AUTH_PATTERNS,
    ValidateUserDto as ClientValidateUserDto,
    UserDto as ClientUserDto,
    SignInDto as ClientSignInDto,
    RefreshAuthDto as ClientRefreshAuthDto
} from "@medvisual/contracts/auth";
import { lastValueFrom } from "rxjs";
import { ITokenPayload } from "./interfaces/token-payload.interface";

@Injectable()
export class AuthService {
    constructor(
        @Inject(AUTH_CLIENT_NAME)
        private readonly authClient: ClientProxy
    ) {}

    async validateUser(
        email: string,
        password: string
    ): Promise<ClientUserDto> {
        try {
            return await lastValueFrom(
                this.authClient.send<ClientUserDto, ClientValidateUserDto>(
                    AUTH_PATTERNS.VALIDATE_USER,
                    { email, password }
                )
            );
        } catch (error) {
            throw new UnauthorizedException(error);
        }
    }

    async signIn(user: { id: number }) {
        return await lastValueFrom(
            this.authClient.send<ClientUserDto, ClientSignInDto>(
                AUTH_PATTERNS.SIGN_IN,
                { userId: user.id }
            )
        );
    }

    async validateRefresh(refreshToken: string, tokenPayload: ITokenPayload) {
        return await lastValueFrom(
            this.authClient.send<boolean, ClientRefreshAuthDto>(
                AUTH_PATTERNS.VALIDATE_REFRESH,
                { refreshToken, tokenPayload }
            )
        );
    }
}
