export type ExtractableValues = string | number | boolean | Date | null | undefined;

export interface QueryFiltersParams {
    [key: string] : ExtractableValues;
}
export interface FiltersParams {
    pageNumber: number; 
    pageSize: number; 
    query: string;
};