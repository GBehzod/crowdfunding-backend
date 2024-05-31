import { array, object, string, TypeOf } from "zod";

export const DistrictSchema = object({
    name: string({
        required_error: 'Name is required',
    }),
    region: string({
        required_error: 'Region is required',
    }),
});

export const bulkCreateDistrictsSchema = object({
    body: array(DistrictSchema)
});

export type BulkCreateDistrictsInput = TypeOf<typeof bulkCreateDistrictsSchema>['body'];