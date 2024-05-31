import { Region } from "../entities/region.entity";
import { RegionInputType } from "../schemas/region.schema";
import { AppDataSource } from "../utils/data-source";

const regionRepo = AppDataSource.getRepository(Region);

export const getRegionsService = async (where: {}, relations: {}) => {
    return await regionRepo.find({
        where,
        relations
    });
}

export const getRegionService = async (where: {}, relations?: {}) => {
    return await regionRepo.findOne({
        where,
        relations
    });
}

export const createRegionService = async (data: RegionInputType) => {
    return await regionRepo.create(data).save();
}