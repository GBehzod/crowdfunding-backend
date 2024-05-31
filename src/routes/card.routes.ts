import { Router } from "express";
import { validate } from "../middleware/validate";
import { createCardSchema, updateCardSchema } from "../schemas/card.schema";
import {
    createCardController,
    deleteCardController,
    getCardsController,
    updateCardController
} from "../controllers/card.controller";
import { deserializeUser } from "../middleware/deserializeUser";

const router = Router();

router.route('/')
    .get(deserializeUser, getCardsController)
    .post(validate(createCardSchema), createCardController);

router.route('/:id')
    .put(validate(updateCardSchema), updateCardController)
    .delete(deleteCardController);

export default router;