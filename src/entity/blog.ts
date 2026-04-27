import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Autores } from "./autores.js";

@Entity()
export class Blog {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({ type: "varchar", length: 100, nullable: true })
    titulo!: string | null;

    @Column({ type: "varchar", length: 200, nullable: true })
    description!: string | null;

    @Column({ type: "text", nullable: true })
    content!: string | null;

    @Column({ type: "timestamp", nullable: false, default: () => "CURRENT_TIMESTAMP" })
    createdAt!: Date;


    @ManyToOne(() => Autores, (autor) => autor.blog, { nullable: false, onDelete: 'CASCADE' })
    autor!: Autores;
}


