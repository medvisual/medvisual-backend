import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({
    name: "blacklisted_refresh_tokens"
})
export class BlacklistedRefreshToken {
    /**
     * The refresh token itself
     */
    @PrimaryColumn({
        name: "refresh_token"
    })
    refreshToken: string;

    /**
     * Refresh token expiry time
     */
    @Column({
        name: "expires_at"
    })
    expiresAt: Date;

    /**
     * Id of the user the token was issued to
     */
    @Column({
        name: "user_id"
    })
    userId: number;
}
