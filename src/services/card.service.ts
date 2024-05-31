import { AppDataSource } from "../utils/data-source";
import { Card } from "../entities/card.entity";

const cardRepo = AppDataSource.getRepository(Card);

export const getCardsService = async (query = {}) => {
    return await cardRepo.find(query);
}

export const getCardByIdService = async (id: string) => {
    return await cardRepo.findOneBy({
        id
    });
}

export const getCardByNumberService = async (number: string) => {
    return await cardRepo.findOneBy({
        number
    });
}

export const createCardService = async (input: Partial<Card>) => {
    return await cardRepo.save(cardRepo.create(input));
}

export const updateCardService = async (id: string, input: Partial<Card>) => {
    return await cardRepo.update(id, input);
}

export const deleteCardService = async (id: string) => {
    return await cardRepo.delete(id);
}