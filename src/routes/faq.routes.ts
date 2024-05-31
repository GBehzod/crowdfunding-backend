import { Router } from "express";
import { createFaqController, deleteFaqController, getFaqsController } from "../controllers/faq.controller";

const router = Router();

router.route('/')
    .get(getFaqsController)
    .post(createFaqController);

router.route('/:id')
    .delete(deleteFaqController);

export default router;