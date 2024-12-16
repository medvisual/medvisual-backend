import { AbstractEntity } from "@medvisual/common/database";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: "users"
})
export class User extends AbstractEntity {
    /**
     * Id of the user (primary key)
     */
    @PrimaryGeneratedColumn()
    id: number;

    /**
     * User display name
     */
    @Column()
    username: string;

    /**
     * User email address
     */
    @Column({ unique: true })
    email: string;

    /**
     * User password
     */
    @Column(/*{ select: false }*/)
    password: string;
}
