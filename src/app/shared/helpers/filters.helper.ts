import { HttpParams } from "@angular/common/http";
import { QueryFiltersParams } from "@shared-models/filters.model";

/**
 * Metodo generico para transformar un objeto a uno de tipo HttpParams
 * @param filters => Objeto que se precisa transformar
 * @returns => HttpParams
 */
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
