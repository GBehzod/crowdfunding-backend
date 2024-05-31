import { object, string, TypeOf, z } from 'zod';
import { RoleEnumType } from '../entities/user.entity';

export const createUserSchema = object({
    body: object({
        first_name: string({
            required_error: 'First name is required',
        }),
        last_name: string({
            required_error: 'Last name is required',
        }),
        phone_number: string({
            required_error: 'Phone number is required',
        }),
        password: string({
            required_error: 'Password is required',
        })
            .min(8, 'Password must be more than 8 characters')
            .max(32, 'Password must be less than 32 characters'),
        passwordConfirm: string({
            required_error: 'Please confirm your password',
        }),
        role: z.optional(z.nativeEnum(RoleEnumType)),
    }).refine((data) => data.password === data.passwordConfirm, {
        path: ['passwordConfirm'],
        message: 'Passwords do not match',
    }),
});

export const loginUserSchema = object({
    body: object({
        phone_number: string({
            required_error: 'Phone number is required',
        }),
        password: string({
            required_error: 'Password is required',
        }).min(8, 'Invalid email or password'),
    }),
});

export const updateUserSchema = object({
    body: object({
        first_name: string().optional(),
        last_name: string().optional(),
        middle_name: string().optional().nullable(),
        birth_date: string().optional().nullable(),
        region: string().optional().nullable(),
        district: string().optional().nullable(),
        photo: string().optional().nullable()
    }),
});

export const updatePasswordSchema = object({
    body: object({
        currentPassword: string({
            required_error: 'Current password is required',
        }),
        newPassword: string({
            required_error: 'New password is required'
        })
    })
});

export type CreateUserInput = Omit<
    TypeOf<typeof createUserSchema>['body'],
    'passwordConfirm'
>;

export type LoginUserInput = TypeOf<typeof loginUserSchema>['body'];
export type UpdateUserPasswordInput = TypeOf<typeof updatePasswordSchema>['body'];
