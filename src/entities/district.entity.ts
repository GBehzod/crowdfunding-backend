import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from "typeorm";
import Model from "./model.entity";
import { Region } from "./region.entity";
import { User } from "./user.entity";
import { Project } from "./project.entity";

@Entity('districts')
export class District extends Model {
    @Column()
    name: string;

    @ManyToOne(() => Region, (region) => region.districts)
    region: Region;

    @OneToOne(() => User, (user) => user.district)
    user: User;

    @OneToMany(() => Project, (project) => project.district)
    projects: Project[];

    toJSON() {
        return { ...this }
    }
}