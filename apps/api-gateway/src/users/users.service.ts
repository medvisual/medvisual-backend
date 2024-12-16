import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";

import { USERS_CLIENT_NAME } from "./constants/constants";
import {
    USERS_PATTERNS,
    CreateUserDto as ClientCreateUserDto,
    FindOneUserDto as ClientFindOneUserDto,
    UpdateUserDto as ClientUpdateUserDto,
    UserDto as ClientUserDto
} from "@medvisual/contracts/users";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UsersService {
    constructor(
        @Inject(USERS_CLIENT_NAME)
        private readonly usersClient: ClientProxy
    ) {}

    async createUser(createUserDto: ClientCreateUserDto) {
        return await lastValueFrom(
            this.usersClient.send<ClientUserDto, ClientCreateUserDto>(
                USERS_PATTERNS.CREATE,
                createUserDto
            )
        );
    }

    getAllUsers() {
        return this.usersClient.send<ClientUserDto[]>(
            USERS_PATTERNS.FIND_ALL,
            {}
        );
    }

    async getUser(id: number) {
        return await lastValueFrom(
            this.usersClient.send<ClientUserDto, ClientFindOneUserDto>(
                USERS_PATTERNS.FIND_ONE,
                { id }
            )
        );
    }

    updateUser(id: number, data: UpdateUserDto) {
        return this.usersClient.send<ClientUserDto, ClientUpdateUserDto>(
            USERS_PATTERNS.UPDATE,
            {
                id,
                ...data
            }
        );
    }

    deleteUser(id: number) {
        return this.usersClient.send<void, number>(USERS_PATTERNS.REMOVE, id);
    }
}
