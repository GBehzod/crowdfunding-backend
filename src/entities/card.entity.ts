import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import Model from "./model.entity";
import { User } from "./user.entity";
import { Project } from "./project.entity";

@Entity('cards')
export class Card extends Model {
    @Column()
    expireDate: string;

    @Column()
    name: string;

    @Column()
    number: string;

    @Column({
        default: 0
    })
    bill: number;

    @ManyToOne(() => User, (user) => user.cards)
    user: User;

    @OneToMany(() => Project, (project) => project.card)
    @JoinColumn({
        name: "project_id"
    })
    projects: Project[];

    toJSON() {
        return {
            ...this
        };
    }
}