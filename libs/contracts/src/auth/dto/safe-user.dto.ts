import { Exclude } from "class-transformer";
import { UserDto } from "./user.dto";

export class SafeUserDto extends UserDto {
    @Exclude()
    password: string;
}
