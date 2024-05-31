import { createRegionService, getRegionService, getRegionsService } from "../services/region.service";
import { Request, Response } from "express";

export const getRegionsHandler = async (req: Request, res: Response) => {
    const regions = await getRegionsService();

    res.status(200).json({
        status: 'success',
        data: regions
    });
}

export const getRegionHandler = async (req: Request, res: Response) => {
    const region = await getRegionService({id: req.params.id}, {districts: true});

    if(!region) {
        return res.status(404).json({
            status: 'error',
            message: 'Region not found'
        });
    }

    res.status(200).json({
        status: 'success',
        data: region
    });

}

export const createRegionHandler = async (req: Request, res: Response) => {
    const region = await createRegionService(req.body);

    res.status(201).json({
        status: 'success',
        data: region
    });
}