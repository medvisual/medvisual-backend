import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-jwt";
import { ExtractJwt } from "passport-jwt";
import { ConfigService } from "@nestjs/config";
import { Request } from "express";

import { AuthService } from "../auth.service";
import { UsersService } from "../../users/users.service";
import { ITokenPayload } from "@medvisual/contracts/auth";

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
    Strategy,
    "jwt-refresh"
) {
    constructor(
        configService: ConfigService,
        private readonly authService: AuthService,
        private readonly usersService: UsersService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.getOrThrow<string>("jwt.refresh.secret"),
            passReqToCallback: true
        });
    }

    async validate(request: Request, tokenPayload: ITokenPayload) {
        try {
            const refreshToken = this.extractTokenFromHeader(request);
            const isValid = await this.authService.validateRefresh(
                refreshToken,
                tokenPayload
            );
            if (!isValid) {
                throw new UnauthorizedException("Refresh token is not valid");
            }

            return await this.usersService.getUser(tokenPayload.userId);
        } catch (error) {
            throw new UnauthorizedException("Failed to refresh auth");
        }
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(" ") ?? [];

        return type === "Bearer" ? token : undefined;
    }
}
