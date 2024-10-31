import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post
} from "@nestjs/common";

import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Controller("/api/users")
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    createUser(@Body() createUserDto: CreateUserDto) {
        return this.usersService.createUser(createUserDto);
    }

    @Get()
    getUsers() {
        return this.usersService.getUsers();
    }

    @Get("/:id")
    getUser(@Param("id") id: number) {
        return this.usersService.getUser(id);
    }

    @Patch("/:id")
    updateUser(@Param("id") id: number, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.updateUser(id, updateUserDto);
    }

    @Delete("/:id")
    deleteUser(@Param("id") id: number) {
        return this.usersService.deleteUser(id);
    }
}
