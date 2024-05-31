import { AppDataSource } from "../utils/data-source";
import { District } from "../entities/district.entity";

const districtRepo = AppDataSource.getRepository(District);

export const getDistrictsService = async () => {
    return await districtRepo.find();
}

export const getDistrictService = async (where: {}, relations?: {}) => {
    return await districtRepo.findOne({
        where,
        relations
    });
}

export const createDistrictService = async (input: Partial<District>) => {
    return await districtRepo.save(districtRepo.create(input));
}