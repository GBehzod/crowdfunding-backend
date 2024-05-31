import Model from "./model.entity";
import { Column, Entity } from "typeorm";

@Entity('faqs')
export class Faq extends Model {
    @Column()
    question: string;

    @Column()
    answer: string;

    toJSON() {
        return {
            ...this,
        };
    }
}