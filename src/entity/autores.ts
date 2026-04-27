import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Blog } from "./blog.js";

@Entity()
export class Autores {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({ type: "varchar", length: 50 })
    nombre!: string;

    @Column({ type: "varchar", length: 50 })
    apellido!: string;

    @Column({ type: "timestamp", nullable: false, default: () => "CURRENT_TIMESTAMP" })
    createdAt!: Date;

    @OneToMany(() => Blog, (blog) => blog.autor)
    blog!: Blog[];
}