import { Router } from "express";
import { validate } from "../middleware/validate";
import { bulkCreateDistrictsSchema } from "../schemas/district.schema";
import { bulkCreateDistrictsHandler, getDistrictsHandler } from "../controllers/district.controller";

const router = Router();

router.route('/')
    .get(getDistrictsHandler)
    .post(validate(bulkCreateDistrictsSchema), bulkCreateDistrictsHandler);

export default router;