import { Faq } from "../entities/faq.entity";

export const getFaqsService = async () => {
    return await Faq.find();
}

export const createFaqService = async (data: Faq) => {
    return await Faq.create(data).save();
}

export const deleteFaqService = async (id: string) => {
    return await Faq.delete(id);
}