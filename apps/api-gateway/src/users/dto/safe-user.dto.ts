import { UserDto as ClientUserDto } from "@medvisual/contracts/users";
import { PartialType } from "@nestjs/mapped-types";
import { Exclude } from "class-transformer";

export class SafeUserDto extends PartialType(ClientUserDto) {
    @Exclude()
    password: string;

    @Exclude()
    refreshToken?: string;
}
