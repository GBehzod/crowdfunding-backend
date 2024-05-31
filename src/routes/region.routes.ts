import { Router } from "express";
import { createRegionHandler, getRegionHandler, getRegionsHandler } from "../controllers/region.controller";
import { validate } from "../middleware/validate";
import { bulkCreateRegionDistrictsSchema, regionSchema } from "../schemas/region.schema";
import { bulkCreateDistrictsHandler } from "../controllers/district.controller";

const router = Router();

router.route('/')
    .get(getRegionsHandler)
    .post(validate(regionSchema), createRegionHandler);

router.route('/:id')
    .get(getRegionHandler);

router.route('/:id/districts')
    .post(validate(bulkCreateRegionDistrictsSchema), bulkCreateDistrictsHandler);


export default router;