import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ default: "", length: 50 })
    name: string

    @Column({ comment: "账号", unique: true })
    account: string

    @Column()
    pwd: string

    @CreateDateColumn()
    add_time: string

    @UpdateDateColumn()
    update_time
}

// 一对一
// @OneToOne(type => Photo)
// @JoinColumn()
// photo: Photo;