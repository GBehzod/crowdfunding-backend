import { Response, Request } from "express";
import { bulkCreateDistrictsService, createDistrictService, getDistrictsService } from "../services/district.service";
import { getRegionService } from "../services/region.service";

export const getDistrictsHandler = async (req: Request, res: Response) => {
    const regions = await getDistrictsService();

    res.status(200).json({
        status: 'success',
        data: regions
    });
}

export const bulkCreateDistrictsHandler = async (req: Request, res: Response) => {
    const region = await getRegionService({ id: req.params.id });

    if(!region) {
        return res.status(404).json({
            status: 'error',
            message: 'Region not found'
        });
    }

    const districts = req.body.districts.map((district: string) => ({ name: district, region }));

    for(const district of districts) {
        await createDistrictService(district)
    }

    res.status(201).json({
        status: 'success',
        message: 'Districts created successfully'
    });
}