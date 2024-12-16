import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNumber, IsString } from "class-validator";

export class UserDto {
    /**
     * Id of the user
     */
    @ApiProperty()
    @IsNumber()
    id: number;

    /**
     * User display name
     */
    @ApiProperty()
    @IsString()
    username: string;

    /**
     * User email address
     */
    @ApiProperty()
    @IsString()
    email: string;

    /**
     * User password
     */
    @IsString()
    password: string;

    /**
     * Unix timestamp of account creation
     */
    @ApiProperty()
    @IsDate()
    createdAt: Date;
}
