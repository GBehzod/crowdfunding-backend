import { NextFunction, Request, Response } from "express";
import { findUser, findUserById, updateUserInfoService, updateUserPasswordService } from "../services/user.service";
import { getRegionService } from "../services/region.service";
import { getDistrictService } from "../services/district.service";
import { UpdateUserPasswordInput } from "../schemas/user.schema";
import { User } from "../entities/user.entity";
import bcrypt from "bcryptjs";

export const getMeHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = await findUser({
            where: {
                id: res.locals.user.id,
            },
            relations: ['region', 'district']
        });

        res.status(200).status(200).json({
            status: 'success',
            data: user,
        });
    } catch (err: any) {
        next(err);
    }
};

export const updateUserMeHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = res.locals.user;

        const region = req.body.region ? await getRegionService({id: req.body.region }) : null;
        const district = req.body.district ? await getDistrictService({ id: req.body.district }) : null;

        const updatedUser = await updateUserInfoService(user.id, {
            ...req.body,
            region,
            district
        });

        res.status(200).json({
            status: 'success',
            data: updatedUser,
        });
    } catch (err: any) {
        next(err);
    }
}

export const updateUserPasswordHandler = async (
    req: Request<{}, {}, UpdateUserPasswordInput>,
    res: Response,
    next: NextFunction
) => {
    try {
        const { currentPassword, newPassword } = req.body;

        const user = await findUserById(res.locals.user.id);

        if(!user) {
            return res.status(404).json({
                status: 'fail',
                message: 'Пользователь не найден',
            });
        }

        const correctCurrentPassword = await User.comparePasswords(currentPassword, user.password);

        if(!correctCurrentPassword) {
            return res.status(400).json({
                status: 'fail',
                message: 'Неверный текущий пароль',
                errorMessage: "invalid_current_password"
            });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 12);
        await updateUserPasswordService(user.id, hashedPassword);

        res.status(200).json({
            status: 'success',
            message: 'Пароль успешно изменен',
        });
    } catch (err: any) {
        next(err);
    }
}