import { Injectable } from "@nestjs/common";
import { DeepPartial, FindOptionsWhere, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { RpcException } from "@nestjs/microservices";
import * as bcrypt from "bcryptjs";

import { CreateUserDto } from "@medvisual/contracts/users";
import { User } from "./entities/user.entity";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}

    async create(createUserDto: CreateUserDto): Promise<User> {
        const { password, ...data } = createUserDto;
        const user = this.userRepository.create(data);
        user.password = await bcrypt.hash(password, 10);

        return this.userRepository.save(user);
    }

    findAll() {
        return this.userRepository.find();
    }

    findOne(options: FindOptionsWhere<User>): Promise<User> {
        try {
            console.log(options);
            return this.userRepository.findOneByOrFail(options);
        } catch (error) {
            throw new RpcException("User not found");
        }
    }

    async update(id: number, data: DeepPartial<User>) {
        const result = await this.userRepository.update(id, data);
        if (result.affected === 0) {
            throw new RpcException("User not found");
        }

        return this.findOne({ id });
    }

    async remove(id: number) {
        const result = await this.userRepository.delete(id);
        if (result.affected === 0) {
            throw new RpcException("User not found");
        }
    }
}
