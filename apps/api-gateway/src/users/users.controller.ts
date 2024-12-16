import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    UseInterceptors
} from "@nestjs/common";

import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { SafeUserDto } from "./dto/safe-user.dto";
import { plainToInstance } from "class-transformer";
import { lastValueFrom } from "rxjs";

@Controller("users")
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    async createUser(@Body() createUserDto: CreateUserDto) {
        const user = await this.usersService.createUser(createUserDto);

        return plainToInstance(SafeUserDto, user);
    }

    // For debug purposes
    @Get("/all")
    @UseInterceptors(ClassSerializerInterceptor)
    async getAllUsers() {
        const users = await lastValueFrom(this.usersService.getAllUsers());

        return plainToInstance(SafeUserDto, users);
    }

    @Get("/:id")
    @UseInterceptors(ClassSerializerInterceptor)
    async getUser(@Param("id") id: number): Promise<SafeUserDto> {
        const user = await this.usersService.getUser(id);

        return plainToInstance(SafeUserDto, user);
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
