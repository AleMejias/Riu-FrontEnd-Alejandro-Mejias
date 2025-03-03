export interface GenericPaginatorConfigModel {
    pageOptionsFirstTitle:  string;
    pageOptionsSecondTitle: string;
    pageInfoTitle:          string;
    pageInfoSeparator:      string;
    pageNumber:             number;
    pageSize:               number;
    totalRecords:           number;
    totalPages:             number;
    pageSizeOptions:        number[];
    lastPage: boolean;
}

export interface PaginatorEmitEvent{
    pageNumber:             number;
    pageSize:               number;
}