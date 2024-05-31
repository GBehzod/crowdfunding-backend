import { Request, Response } from "express";
import {
    createProjectService,
    deleteProjectService,
    getProjectService,
    getProjectsService, getProjectTypeStatisticsService
} from "../services/project.service";
import { findUserById } from "../services/user.service";
import { getRegionService } from "../services/region.service";
import { getDistrictService } from "../services/district.service";
import { getCardByIdService } from "../services/card.service";

export const getProjectsController = async (req: Request, res: Response) => {
    const projects = await getProjectsService({
        where: {
            owner: {
                id: req.query.ownerId
            },
        }
    });

    res.status(200).json({
        status: 'success',
        data: {
            content: projects
        }
    });
}

export const getProjectController = async (req: Request, res: Response) => {
    const project = await getProjectService(req.params.id);

    res.status(200).json({
        status: 'success',
        data: project
    });
}

export const createProjectController = async (req: Request, res: Response) => {
    const owner = await findUserById(req.body.ownerId);
    const region = req.body.regionId ? await getRegionService({id: req.body.regionId }) : null;
    const district = req.body.cityId ? await getDistrictService({ id: req.body.cityId }) : null;
    const card = req.body.cardId ? await getCardByIdService(req.body.cardId) : null;

    const project = await createProjectService({
        ...req.body,
        owner,
        region,
        district,
        card
    });

    res.status(201).json({
        status: 'success',
        data: project
    });
}

export const deleteProjectController = async (req: Request, res: Response) => {
    const project = await getProjectService(req.params.id);

    if(!project) {
        return res.status(404).json({
            status: 'fail',
            message: 'Project not found'
        });
    }

    await deleteProjectService(project.id);

    res.status(204).json({
        status: 'success',
        data: 'Project deleted successfully'
    });
}

export const getProjectTypeStatisticsController = async (req: Request, res: Response) => {
    const stats = await getProjectTypeStatisticsService();

    res.status(200).json({
        status: 'success',
        data: stats
    });
}

export const investProjectController = async (req: Request, res: Response) => {
    const project = await getProjectService(req.body.projectId);

    if(!project) {
        return res.status(404).json({
            status: 'fail',
            message: 'Project not found'
        });
    }

    const card = await getCardByIdService(req.body.cardId);

    if(!card) {
        return res.status(404).json({
            status: 'fail',
            message: 'Card not found'
        });
    }

    project.card.bill += req.body.value;
    project.currentAmount += req.body.value;
    await project.save();
    await project.card.save()

    card.bill -= req.body.value;
    await card.save();


    // await project.addInvestor(user, req.body.amount);

    res.status(200).json({
        status: 'success',
        data: 'Investment successful'
    });
}