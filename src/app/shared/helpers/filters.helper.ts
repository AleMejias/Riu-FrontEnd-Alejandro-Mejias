import { HttpParams } from "@angular/common/http";
import { QueryFiltersParams } from "@shared-models/filters.model";

const buildHttpParams = (filters: QueryFiltersParams): HttpParams => {
  let params = new HttpParams();
  for (const element in filters) {
    const key = element;

    if (
      filters[key] !== undefined &&
      filters[key] !== null &&
      filters[key] !== ''
    ) {
      params = params.set(key, `${filters[key]}`);
    }
  }
  return params;
};

export const FILTERS_HELPER = {
  buildHttpParams
};
