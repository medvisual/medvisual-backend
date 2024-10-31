import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";

import { UsersService } from "./users.service";
import {
    USERS_PATTERNS,
    CreateUserDto,
    FindOneUserDto,
    UpdateUserDto
} from "@medvisual/contracts/users";

@Controller()
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @MessagePattern(USERS_PATTERNS.CREATE)
    create(@Payload() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @MessagePattern(USERS_PATTERNS.FIND_ALL)
    findAll() {
        return this.usersService.findAll();
    }

    @MessagePattern(USERS_PATTERNS.FIND_ONE)
    findOne(@Payload() options: FindOneUserDto) {
        return this.usersService.findOne(options);
    }

    @MessagePattern(USERS_PATTERNS.UPDATE)
    update(@Payload() updateUserDto: UpdateUserDto) {
        const { id, ...data } = updateUserDto;
        return this.usersService.update(id, data);
    }

    @MessagePattern(USERS_PATTERNS.REMOVE)
    remove(@Payload() id: number) {
        return this.usersService.remove(id);
    }
}
