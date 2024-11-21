import { Exclude } from "class-transformer";
import { CreateDateColumn } from "typeorm";

export abstract class AbstractEntity {
    @CreateDateColumn({
        name: "created_at"
    })
    @Exclude()
    public createdAt: Date;
}
