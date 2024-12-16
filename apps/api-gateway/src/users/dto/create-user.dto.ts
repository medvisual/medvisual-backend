import { ApiProperty, OmitType } from "@nestjs/swagger";
import { UserDto } from "./user.dto";

export class CreateUserDto extends OmitType(UserDto, [
    "id",
    "createdAt"
] as const) {
    @ApiProperty()
    password: string;
}
