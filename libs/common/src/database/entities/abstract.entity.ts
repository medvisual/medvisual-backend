import { Exclude } from "class-transformer";
import { CreateDateColumn } from "typeorm";

export abstract class AbstractEntity {
    @CreateDateColumn()
    @Exclude()
    public createdAt: Date;
}
