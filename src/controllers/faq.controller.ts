import { Request, Response } from "express";
import { createFaqService, deleteFaqService, getFaqsService } from "../services/faq.service";

export const getFaqsController = async (req: Request, res: Response) => {
    const faqs = await getFaqsService();

    return res.status(200).json({
        status: 'success',
        data: faqs,
    });
}

export const createFaqController = async (req: Request, res: Response) => {
    const faq = await createFaqService(req.body);

    return res.status(201).json({
        status: 'success',
        data: faq,
    });
}

export const deleteFaqController = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        await deleteFaqService(id);

        return res.status(204).json({
            status: 'success',
        });
    }
    catch (error) {
        return res.status(404).json({
            status: 'fail',
            message: 'FAQ not found',
        });
    }
}