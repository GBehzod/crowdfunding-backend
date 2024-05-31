import Model from "./model.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { User } from "./user.entity";
import { Card } from "./card.entity";
import { District } from "./district.entity";
import { Region } from "./region.entity";

@Entity('projects')
export class Project extends Model {
    @ManyToOne(() => Region, region => region.projects)
    @JoinColumn({
        name: "region_id"
    })
    region: Region;

    @ManyToOne(() => District, district => district.projects)
    @JoinColumn({
        name: "district_id"
    })
    district: District;

    @Column({
        default: 0
    })
    currentAmount: number;

    @Column()
    description: string;

    @Column()
    finishDate: string;

    @Column()
    imageId: string;

    @Column('text', { array: true})
    images: string[];

    @Column()
    minimalPayment: number;

    @Column()
    name: string;

    @ManyToOne(() => User, user => user.projects)
    @JoinColumn({
        name: "owner_id"
    })
    owner: User

    @Column()
    shortDescription: string;

    @Column()
    targetAmount: number;

    @Column()
    type: string;

    @ManyToOne(() => Card, card => card.projects)
    @JoinColumn({
        name: "card_id"
    })
    card: Card;
}