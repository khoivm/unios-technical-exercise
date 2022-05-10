export type FindManyResult<T> = {
    result: T[];
    totalRecords: number;
};

export type SearchOptions<T> = {
    page: number;
    pageSize: number;
    sortField: keyof T;
    sortDirection: SortDirection;
};

export type SearchFilter<T> = {
    [K in keyof T]: T[K];
};

export type SortDirection = 'asc' | 'desc';

export type RepositoryModel = {
    id: number;
    [k: string]: any;
};

export default interface IRepository<T extends RepositoryModel> {
    create: (data: T) => Promise<void>;
    delete: (id: number) => Promise<void>;
    find: (id: number) => Promise<T>;
    findMany: (filter?: SearchFilter<T>, options?: SearchOptions<T>) => Promise<FindManyResult<T>>;
    update: (id: number, data: T) => Promise<void>;
}
