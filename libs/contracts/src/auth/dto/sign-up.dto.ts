import { OmitType } from "@nestjs/mapped-types";
import { UserDto } from "./user.dto";

export class SignUpDto extends OmitType(UserDto, [
    "id",
    "createdAt"
] as const) {}
