import { InjectRepository } from "@nestjs/typeorm";
import { BlacklistedRefreshToken } from "./entities/blacklisted-refresh-token.entity";
import { Repository } from "typeorm";

/**
 * Token rotation methods
 */
export class RefreshTokenBlacklistService {
    constructor(
        @InjectRepository(BlacklistedRefreshToken)
        private readonly blacklistedTokenRepository: Repository<BlacklistedRefreshToken>
    ) {}

    blacklist(refreshToken: string, expiresAt: Date, userId: number) {
        return this.blacklistedTokenRepository.insert({
            refreshToken,
            expiresAt,
            userId
        });
    }

    isBlacklisted(refreshToken: string) {
        return this.blacklistedTokenRepository.existsBy({ refreshToken });
    }
}
