import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";

import { AuthService } from "./auth.service";
import { AUTH_PATTERNS, ValidateUserDto } from "@medvisual/contracts/auth";
import { RefreshAuthDto } from "@medvisual/contracts/auth";
import { SignInDto } from "@medvisual/contracts/auth";

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @MessagePattern(AUTH_PATTERNS.VALIDATE_USER)
    validateUser(@Payload() validateUserDto: ValidateUserDto) {
        return this.authService.validateUser(
            validateUserDto.email,
            validateUserDto.password
        );
    }

    @MessagePattern(AUTH_PATTERNS.SIGN_IN)
    signIn(@Payload() signInDto: SignInDto) {
        return this.authService.generateAuth({
            userId: signInDto.userId
        });
    }

    @MessagePattern(AUTH_PATTERNS.VALIDATE_REFRESH)
    validateRefresh(@Payload() refreshAuthDto: RefreshAuthDto) {
        return this.authService.validateRefreshToken(
            refreshAuthDto.refreshToken,
            refreshAuthDto.tokenPayload
        );
    }
}
