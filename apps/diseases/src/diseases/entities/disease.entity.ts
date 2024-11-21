import { AbstractEntity } from "@medvisual/common/database";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: "diseases"
})
export class DiseaseEntity extends AbstractEntity {
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
    @Column({ nullable: true })
    description?: string;

    /**
     * Department responsible for the disease
     */
    @Column()
    department: string;
}
