import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-jwt";
import { ExtractJwt } from "passport-jwt";
import { ConfigService } from "@nestjs/config";

import { UsersService } from "../../users/users.service";
import { TokenPayload } from "@medvisual/contracts/auth";
import { Request } from "express";

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
    Strategy,
    "jwt-refresh"
) {
    constructor(
        configService: ConfigService,
        private readonly usersService: UsersService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.getOrThrow<string>("jwt.refresh.secret"),
            passReqToCallback: true
        });
    }

    async validate(request: Request, tokenPayload: TokenPayload) {
        try {
            const user = await this.usersService.getUser(tokenPayload.sub);
            const refreshToken = this.extractTokenFromHeader(request);
            if (!refreshToken) {
                throw new UnauthorizedException();
            }

            return [
                user,
                {
                    refreshToken,
                    refreshTokenExpiresAt: new Date(tokenPayload.exp * 1000)
                }
            ];
        } catch (error) {
            throw new UnauthorizedException();
        }
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(" ") ?? [];

        return type === "Bearer" ? token : undefined;
    }
}
