import { Controller, Post, Request, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { JwtRefreshAuthGuard } from "./guards/jwt-refresh-auth.guard";

@Controller("/api/auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post("signin")
    @UseGuards(LocalAuthGuard)
    signIn(@Request() request) {
        return this.authService.signIn(request.user);
    }

    @Post("refresh")
    @UseGuards(JwtRefreshAuthGuard)
    refresh(@Request() request) {
        return this.authService.signIn(request.user);
    }

    @Post("signout")
    signOut() {
        // TODO: Implement. Should revoke refresh JWT?
        return;
    }
}
