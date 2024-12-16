import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";

import { AUTH_CLIENT_NAME } from "./constants/constants";
import {
    AUTH_PATTERNS,
    ValidateUserDto as ClientValidateUserDto,
    UserDto as ClientUserDto,
    TokenPairDto as ClientTokenPairDto,
    SignInDto as ClientSignInDto,
    RefreshDto as ClientRefreshDto,
    SignUpDto as ClientSignUpDto,
    SafeUserDto as ClientSafeUserDto
} from "@medvisual/contracts/auth";
import { lastValueFrom } from "rxjs";
import { TokenPayload } from "./interfaces/token-payload.interface";

@Injectable()
export class AuthService {
    constructor(
        @Inject(AUTH_CLIENT_NAME)
        private readonly authClient: ClientProxy
    ) {}

    validateUser(email: string, password: string): Promise<ClientUserDto> {
        try {
            return lastValueFrom(
                this.authClient.send<ClientUserDto, ClientValidateUserDto>(
                    AUTH_PATTERNS.VALIDATE_USER,
                    { email, password }
                )
            );
        } catch (error) {
            throw new UnauthorizedException(error);
        }
    }

    signUp(signUpDto: ClientSignUpDto) {
        return lastValueFrom(
            this.authClient.send<ClientSafeUserDto, ClientSignUpDto>(
                AUTH_PATTERNS.SIGN_UP,
                signUpDto
            )
        );
    }

    signIn(tokenPayload: TokenPayload) {
        return lastValueFrom(
            this.authClient.send<ClientTokenPairDto, ClientSignInDto>(
                AUTH_PATTERNS.SIGN_IN,
                { tokenPayload }
            )
        );
    }

    async refresh(
        refreshToken: string,
        tokenPayload: TokenPayload,
        tokenExpiresAt: Date
    ) {
        try {
            const tokenPair = await lastValueFrom(
                this.authClient.send<ClientTokenPairDto, ClientRefreshDto>(
                    AUTH_PATTERNS.REFRESH,
                    { refreshToken, tokenPayload, tokenExpiresAt }
                )
            );

            return tokenPair;
        } catch (error) {
            throw new UnauthorizedException();
        }
    }
}
