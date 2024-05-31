require('dotenv').config();

import AppError from "./utils/appError";
import express, { NextFunction, Response, Request } from 'express';
import config from 'config';
import validateEnv from './utils/validateEnv';
import { AppDataSource } from './utils/data-source';
import redisClient from './utils/connectRedis';
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from "cors";

import storageRouter from './routes/storage.routes';
import authRouter from './routes/auth.routes';
import userRouter from './routes/user.routes';
import faqRouter from './routes/faq.routes';
import projectRouter from './routes/project.routes';
import regionRouter from './routes/region.routes';
import districtRouter from './routes/district.routes';
import cardRouter from './routes/card.routes';

AppDataSource.initialize()
    .then(async () => {
        // VALIDATE ENV
        validateEnv();

        const app = express();

        // MIDDLEWARE

        // 1. Body parser
        app.use(express.json({ limit: '10kb' }));

        // 2. Logger
        if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

        // 3. Cookie Parser
        app.use(cookieParser());

        // 4. Cors
        app.use(
            cors({
                origin: config.get<string>('origin'),
                credentials: true,
            })
        );

        app.use(express.static('public'));

        // ROUTES
        app.use('/api/auth', authRouter);
        app.use('/api/users', userRouter);
        app.use('/api/faq', faqRouter);
        app.use('/api/projects', projectRouter);
        app.use('/api/regions', regionRouter);
        app.use('/api/districts', districtRouter);
        app.use('/api/cards', cardRouter);
        app.use('/api/storage', storageRouter);

        // HEALTH CHECKER
        app.get('/api/healthchecker', async (_, res: Response) => {
            const message = await redisClient.get('try');
            res.status(200).json({
                status: 'success',
                message,
            });
        });

        // UNHANDLED ROUTE
        app.all('*', (req: Request, res: Response, next: NextFunction) => {
            next(new AppError(404, `Route ${req.originalUrl} not found`));
        });

        // GLOBAL ERROR HANDLER
        app.use(
            (error: AppError, req: Request, res: Response, next: NextFunction) => {
                error.status = error.status || 'error';
                error.statusCode = error.statusCode || 500;

                res.status(error.statusCode).json({
                    status: error.status,
                    message: error.message,
                });
            }
        );

        const port = config.get<number>('port');
        app.listen(port);

        console.log(`Server started on port: ${port}`);
    })
    .catch((error) => console.log(error));

