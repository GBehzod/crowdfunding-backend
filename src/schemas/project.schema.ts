import { number, object, string } from "zod";

export const createProjectSchema = object({
    body: object({
        type: string({
            required_error: "Type is required"
        }),
        name: string({
            required_error: "Name is required"
        }),
        description: string({
            required_error: "Description is required"
        }),
        shortDescription: string({
            required_error: "Short Description is required"
        }),
        imageId: string({
            required_error: "Image is required"
        }),
        cardId: string({
            required_error: "Card is required"
        }),
    })
})

export const investProjectSchema = object({
    body: object({
        cardId: string({
            required_error: "Card is required"
        }),
        projectId: string({
            required_error: "Project is required"
        }),
        value: number({
            required_error: "Value is required"
        })
    })
});