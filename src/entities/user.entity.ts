import { Entity, Column, Index, BeforeInsert, OneToMany, OneToOne, JoinColumn, BeforeUpdate } from 'typeorm';
import bcrypt from 'bcryptjs';
import Model from './model.entity';
import { Project } from "./project.entity";
import { Card } from "./card.entity";
import { Region } from "./region.entity";
import { District } from "./district.entity";

export enum RoleEnumType {
    USER = 'user',
    ADMIN = 'admin',
}

@Entity('users')
export class User extends Model {
    @Column()
    first_name: string;

    @Column()
    last_name: string;

    @Column({
        nullable: true,
    })
    middle_name: string;

    @Column({
        nullable: true,
    })
    birth_date: string;

    @Index('phone_number')
    @Column({
        unique: true,
    })
    phone_number: string;

    @Column()
    password: string;

    @Column({
        type: 'enum',
        enum: RoleEnumType,
        default: RoleEnumType.USER,
    })
    role: RoleEnumType.USER;

    @Column({
        default: 'default.png',
    })
    photo: string;

    @OneToOne(() => Region, region => region.user)
    @JoinColumn({
        name: "region_id"
    })
    region: Region;

    @OneToOne(() => District, district => district.user)
    @JoinColumn({
        name: "district_id"
    })
    district: District;

    @OneToMany(() => Project, project => project.owner)
    projects: Project[];

    @OneToMany(() => Card, card => card.user)
    cards: Card[];

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 12);
    }

    static async comparePasswords(
        candidatePassword: string,
        hashedPassword: string
    ) {
        return await bcrypt.compare(candidatePassword, hashedPassword);
    }

    toJSON() {
        return {
            ...this,
            password: undefined,
            verified: undefined,
            verificationCode: undefined,
        };
    }
}
