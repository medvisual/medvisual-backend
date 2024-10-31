import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
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

    /**
     * Refresh JWT
     */
    @Column({
        nullable: true
        /* select: false */
    })
    refreshToken: string;
}
