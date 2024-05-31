import { Router } from "express";
import {
    createProjectController, deleteProjectController,
    getProjectController,
    getProjectsController, getProjectTypeStatisticsController, investProjectController
} from "../controllers/project.controller";
import { validate } from "../middleware/validate";
import { createProjectSchema, investProjectSchema } from "../schemas/project.schema";
import { deserializeUser } from "../middleware/deserializeUser";

const router = Router();

router.route('/')
    .get(deserializeUser, getProjectsController)
    .post(validate(createProjectSchema), createProjectController);

router.route('/stats')
    .get(getProjectTypeStatisticsController);

router.route('/invest')
    .post(validate(investProjectSchema), investProjectController)

router.route('/:id')
    .get(getProjectController)
    .delete(deleteProjectController);

export default router;