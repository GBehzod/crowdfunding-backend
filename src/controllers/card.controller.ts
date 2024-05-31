import { Request, Response } from 'express';
import {
    createCardService, deleteCardService,
    getCardByIdService,
    getCardByNumberService,
    getCardsService, updateCardService
} from "../services/card.service";
import { findUserById } from "../services/user.service";
import { getProjectByCardService } from "../services/project.service";

export const getCardsController = async (req: Request, res: Response) => {
    const user = res.locals.user;

    const cards = await getCardsService({
        where: {
            user: {
                id: user.id,
            }
        }
    });

    res.status(200).json({
        status: 'success',
        data: cards,
    });
}

export const createCardController = async (req: Request, res: Response) => {
    const card = await getCardByNumberService(req.body.number);

    if(card) {
        return res.status(409).json({
            status: 'fail',
            message: 'Card already exists',
        });
    }

    const user = await findUserById(req.body.userId);

    const newCard = await createCardService({
        ...req.body,
        user,
    });

    res.status(201).json({
        status: 'success',
        data: newCard,
    });
}

export const updateCardController = async (req: Request, res: Response) => {
    const card = await getCardByIdService(req.params.id);

    if(!card) {
        return res.status(404).json({
            status: 'fail',
            message: 'Card not found',
        });
    }

    const updatedCard = await updateCardService(req.params.id, req.body);

    res.status(200).json({
        status: 'success',
        data: updatedCard,
    });
}

export const deleteCardController = async (req: Request, res: Response) => {
    const card = await getCardByIdService(req.params.id);

    if(!card) {
        return res.status(404).json({
            status: 'fail',
            message: 'Card not found',
        });
    }

    const projectWithCard = await getProjectByCardService(card.id);

    if(projectWithCard) {
        return res.status(409).json({
            status: 'fail',
            message: 'Card is associated with a project',
            slug: 'CARD_ASSOCIATED_WITH_PROJECT',
        });

    }

    await deleteCardService(req.params.id);

    res.status(204).json({
        status: 'success',
        data: null,
    });
}