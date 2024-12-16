import {
    ClassSerializerInterceptor,
    Controller,
    UseInterceptors
} from "@nestjs/common";
import { MessagePattern, Payload, RpcException } from "@nestjs/microservices";

import { AuthService } from "./auth.service";
import {
    AUTH_PATTERNS,
    SignInDto,
    RefreshDto,
    TokenPairDto,
    ValidateUserDto,
    SafeUserDto,
    SignUpDto
} from "@medvisual/contracts/auth";
import { RefreshTokenBlacklistService } from "./refresh-token-blacklist.service";
import { plainToInstance } from "class-transformer";

@Controller()
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly refreshTokenBlacklistService: RefreshTokenBlacklistService
    ) {}

    @MessagePattern(AUTH_PATTERNS.VALIDATE_USER)
    validateUser(@Payload() validateUserDto: ValidateUserDto) {
        return this.authService.validateUserCredentials(
            validateUserDto.email,
            validateUserDto.password
        );
    }

    @MessagePattern(AUTH_PATTERNS.SIGN_UP)
    @UseInterceptors(ClassSerializerInterceptor)
    async signUp(@Payload() signUpDto: SignUpDto): Promise<SafeUserDto> {
        return plainToInstance(SafeUserDto, this.authService.signUp(signUpDto));
    }

    @MessagePattern(AUTH_PATTERNS.SIGN_IN)
    async signIn(@Payload() signInDto: SignInDto): Promise<TokenPairDto> {
        // const user = await this.authService.validateUserCredentials(
        //     signInDto.email,
        //     signInDto.password
        // );

        // If validation passed, return a token pair
        console.log(signInDto);
        return this.authService.generateTokens(signInDto.tokenPayload);
    }

    @MessagePattern(AUTH_PATTERNS.REFRESH)
    async refresh(@Payload() refreshDto: RefreshDto): Promise<TokenPairDto> {
        console.log(refreshDto);

        const isRefreshBlacklisted =
            await this.refreshTokenBlacklistService.isBlacklisted(
                refreshDto.refreshToken
            );
        if (isRefreshBlacklisted) {
            throw new RpcException("Refresh token is blacklisted");
        }

        const newTokenPair = await this.authService.generateTokens(
            refreshDto.tokenPayload
        );
        await this.refreshTokenBlacklistService.blacklist(
            refreshDto.refreshToken,
            // Date constructor accepts milliseconds
            new Date(refreshDto.tokenExpiresAt),
            refreshDto.tokenPayload.sub
        );

        return newTokenPair;
    }
}
