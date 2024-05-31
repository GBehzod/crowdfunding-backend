import { User } from '../entities/user.entity';
import { AppDataSource } from '../utils/data-source';
import { DeepPartial } from "typeorm";
import redisClient from "../utils/connectRedis";
import config from "config";
import { signJwt } from "../utils/jwt";

const userRepository = AppDataSource.getRepository(User);

export const createUser = async (input: DeepPartial<User>) => {
    return await userRepository.save(userRepository.create(input));
};

export const findUserByPhoneNumber = async ({ phone_number }: { phone_number: string }) => {
    return await userRepository.findOneBy({ phone_number });
};

export const findUserById = async (userId: string) => {
    return await userRepository.findOneBy({ id: userId });
};

export const findUser = async (options: Object) => {
    return await userRepository.findOne(options);
};

// ? Sign access and Refresh Tokens
export const signTokens = async (user: User) => {
    // 1. Create Session
    redisClient.set(user.id, JSON.stringify(user), {
        EX: config.get<number>('redisCacheExpiresIn') * 60,
    });



    // 2. Create Access and Refresh tokens
    const access_token = signJwt({ sub: user.id }, 'accessTokenPrivateKey', {
        expiresIn: `${config.get<number>('accessTokenExpiresIn')}m`,
    });

    const refresh_token = signJwt({ sub: user.id }, 'refreshTokenPrivateKey', {
        expiresIn: `${config.get<number>('refreshTokenExpiresIn')}m`,
    });

    return { access_token, refresh_token };
};

export const updateUserInfoService = async (userId: string, input: DeepPartial<User>) => {
    return await userRepository.update(userId, input);
}

export const updateUserPasswordService = async (userId: string, password: string) => {
    return await userRepository.update(userId, { password });
}