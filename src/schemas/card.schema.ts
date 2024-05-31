import { object, string, TypeOf } from "zod";

export const createCardSchema = object({
    body: object({
        expireDate: string(),
        name: string(),
        number: string(),
        userId: string()
    })
});

export const updateCardSchema = object({
    params: object({
        id: string().uuid()
    }),
    body: object({
        name: string(),
    })
});

export type CreateCardInput = TypeOf<typeof createCardSchema>['body'];