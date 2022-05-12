import { SearchFilter, SearchOptions } from '@/repositories/IRepository';
import { NextApiHandler } from 'next';
import { HttpMethod } from './http';

export interface ApiResponse<T> {
    data: T;
    page: number;
    pageSize: number;
    totalRecords: number;
}

export type HandlerCollection = {
    [key in HttpMethod]?: NextApiHandler;
};

/**
 * Receives a `query` object extracted from a NextApiRequest, interrogates it for
 * `searchOptions`, and returns a valid SearchOptions object with appropriate defaults
 * @param query Query object from the NextApiRequest `req` object
 * @returns {SearchOptions<T>}
 */
export const extractSearchOptions = <T>(query: { [key: string]: string | string[] }): SearchOptions<T> => {
    if ([null, undefined].includes(query?.searchOptions)) return {} as SearchOptions<T>;

    const opts = JSON.parse(query?.searchOptions as string) as SearchOptions<T>;
    return {
        page: opts?.page ? Number(opts?.page) : 1,
        pageSize: opts?.pageSize ? Number(opts?.pageSize) : null,
        sortField: opts?.sortField,
        sortDirection: opts?.sortDirection,
    };
};

/**
 * Receives a `query` object extracted from a NextApiRequest, interrogates it for
 * `filters`, and returns a typed SearchOptions object
 * @param query Query object from the NextApiRequest `req` object
 * @returns {SearchFilter<T>}
 */
export const extractSearchFilter = <T>(query: { [key: string]: string | string[] }): SearchFilter<T> => {
    if ([null, undefined].includes(query?.filters)) return {} as SearchFilter<T>;
    return JSON.parse(query?.filters as string) as SearchFilter<T>;
};
