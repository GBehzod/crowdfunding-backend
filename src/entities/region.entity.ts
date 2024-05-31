import { Column, Entity, OneToMany, OneToOne } from "typeorm";
import Model from "./model.entity";
import { District } from "./district.entity";
import { User } from "./user.entity";
import { Project } from "./project.entity";

@Entity('regions')
export class Region extends Model {
    @Column()
    name: string;

    @OneToMany(() => District, (district) => district.region)
    districts: District[];

    @OneToOne(() => User, (user) => user.region)
    user: User;

    @OneToMany(() => Project, (project) => project.region)
    projects: Project[];

    toJSON() {
        return { ...this }
    }
}