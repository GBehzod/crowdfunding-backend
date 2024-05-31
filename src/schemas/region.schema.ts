import { array, object, string, TypeOf } from "zod";

export const regionSchema = object({
    body: object({
        name: string({
            required_error: 'Name is required',
        }),
    }),
});

export const bulkCreateRegionDistrictsSchema = object({
    params: object({
        id: string({
            required_error: 'Region ID is required',
        }),
    }),
    body: object({
        districts: array(string({
            required_error: 'District name is required',
        }))
    }),
});

export type RegionInputType = TypeOf<typeof regionSchema>['body'];
export type BulkCreateRegionDistrictsInput = TypeOf<typeof bulkCreateRegionDistrictsSchema>['body'];
export type RegionIdInput = TypeOf<typeof bulkCreateRegionDistrictsSchema>['params'];