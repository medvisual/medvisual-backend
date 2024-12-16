import { Body, Controller, Post, Request, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { JwtRefreshAuthGuard } from "./guards/jwt-refresh-auth.guard";
import { UserDto } from "@medvisual/contracts/users";
import { SignUpDto } from "./dto/sign-up.dto";

@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post("signup")
    signUp(@Body() signUpDto: SignUpDto) {
        return this.authService.signUp(signUpDto);
    }

    @Post("signin")
    @UseGuards(LocalAuthGuard)
    signIn(@Request() request) {
        return this.authService.signIn({
            sub: (request.user as UserDto)?.id
        });
    }

    @Post("refresh")
    @UseGuards(JwtRefreshAuthGuard)
    refresh(@Request() request) {
        return this.authService.refresh(
            request.authInfo?.refreshToken,
            {
                sub: (request.user as UserDto)?.id
            },
            request.authInfo?.refreshTokenExpiresAt
        );
    }

    @Post("signout")
    signOut() {
        // TODO: Implement. Should revoke refresh JWT?
        return;
    }
}
