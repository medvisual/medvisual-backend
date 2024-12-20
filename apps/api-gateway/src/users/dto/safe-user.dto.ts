import { UserDto } from "./user.dto";
import { Exclude } from "class-transformer";

export class SafeUserDto extends UserDto {
    @Exclude()
    password: string;
}
