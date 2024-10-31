import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Disease {
    /**
     * Id of the disease (primary key)
     */
    @PrimaryGeneratedColumn()
    id: number;

    /**
     * Name of the disease
     */
    @Column({ unique: true })
    name: string;

    /**
     * Description of the disease
     */
    @Column()
    description: string;

    /**
     * Department responsible for the disease
     */
    @Column()
    department: string;
}
