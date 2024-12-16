import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-jwt";
import { ExtractJwt } from "passport-jwt";
import { ConfigService } from "@nestjs/config";

import { UsersService } from "../../users/users.service";
import { TokenPayload } from "@medvisual/contracts/auth";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        configService: ConfigService,
        private readonly usersSerivce: UsersService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.getOrThrow<string>("jwt.access.secret")
        });
    }

    validate(tokenPayload: TokenPayload) {
        try {
            return this.usersSerivce.getUser(tokenPayload.sub);
        } catch (error) {
            throw new UnauthorizedException("User not found");
        }
    }
}
