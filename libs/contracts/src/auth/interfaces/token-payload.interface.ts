export interface TokenPayload {
    /**
     * User id
     */
    sub: number;
    iat?: number;
    exp?: number;
}
