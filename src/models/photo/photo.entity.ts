import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinTable } from "typeorm";
import { Users } from "../user/user.entity";

@Entity()
export class Photo {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ default: "", length: 500 })
    src: string

    @CreateDateColumn()
    add_time: string

    @UpdateDateColumn()
    update_time

    @ManyToOne(type => Users, user => user.photos, {
        cascade: true
    })
    @JoinTable({ name: "userId" })
    user: Users

}

// 一对一
// @OneToOne(type => Photo)
// @JoinColumn()
// photo: Photo;