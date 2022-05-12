import { existsSync, readFileSync, writeFileSync } from 'fs';
import IRepository, { RepositoryModel, SearchFilter, SearchOptions } from './IRepository';

export abstract class FileSystemRepository<T extends RepositoryModel> implements IRepository<T> {
    protected _filePath: string;

    constructor(filePath: string) {
        if (!existsSync(filePath)) throw new Error(`File could not be found: '${filePath}'`);
        this._filePath = filePath;
    }

    async create(data: T) {
        if (Object.values(data).every((v) => v === null || v === undefined)) throw new Error('The supplied object is empty');

        // append new data to existing data set and then rewrite to disk
        const state = this._loadDataFromFile();
        const nextId = Math.max(...state.map((d) => d.id)) + 1;
        const newState = [...state, { ...data, id: nextId }];
        writeFileSync(this._filePath, JSON.stringify(newState), 'utf-8');
    }

    async delete(id: number) {
        if (id < 1) throw new Error(`Invalid id supplied`);

        // remove from existing data set and then rewrite to disk
        const state = this._loadDataFromFile();
        const index = state.findIndex((d) => d.id === id);
        if (index < 0) throw new Error(`Could not find data with id '${id}'`);

        const newState = [...state.slice(0, index), ...state.slice(index + 1)];
        writeFileSync(this._filePath, JSON.stringify(newState), 'utf-8');
    }

    async find(id: number) {
        if (id < 1) throw new Error(`Invalid id supplied`);

        const state = this._loadDataFromFile();
        const found = state.find((d) => d.id === id);
        return found;
    }

    async findMany(filter?: SearchFilter<T>, options?: SearchOptions<T>) {
        const state = this._loadDataFromFile();
        const filteredResult = this._applyFilters(state, filter);
        return {
            result: this._applySearchOptions(filteredResult, options),
            totalRecords: filteredResult.length,
        };
    }

    async update(id: number, data: T) {
        // update by merging existing object with supplied data
        if (id < 1) throw new Error(`Invalid id supplied`);
        if (id !== data.id) throw new Error(`Specified id does not match object identifier`);

        const state = this._loadDataFromFile();
        const index = state.findIndex((d) => d.id === id);
        if (index < 0) throw new Error(`Could not find data with id '${id}'`);

        const newObject = { ...state[index], ...data };
        const newState = [...state.slice(0, index), newObject, ...state.slice(index + 1)];
        writeFileSync(this._filePath, JSON.stringify(newState), 'utf-8');
    }

    protected _applyFilters(rows: T[] = [], filter: SearchFilter<T> = null) {
        if (filter === null) return rows;

        // map filters to a list of predicates
        const conditions = Object.entries(filter).map(
            ([key, value]) =>
                (t: T) =>
                    t[key] === value
        );
        return rows.filter((t) => conditions.every((p) => p(t)));
    }

    protected _applySearchOptions(rows: T[] = [], options: SearchOptions<T> = null) {
        if (options === null) return rows;

        let result: T[];

        // paging
        const page = options?.page && options.page > 0 ? options.page : 1;
        const pageSize = options?.pageSize;
        if (page && pageSize) {
            const startIndex = (page - 1) * pageSize;
            result = rows.slice(startIndex, startIndex + pageSize);
        } else {
            result = rows;
        }

        // sorting
        const sortField = options?.sortField;
        const sortVector = (options?.sortDirection || 'asc') === 'asc' ? 1 : -1;
        if (sortField) {
            result = result.sort((prev, next) => {
                if (prev[sortField] < next[sortField]) return sortVector * -1;
                if (prev[sortField] > next[sortField]) return sortVector * 1;
                return 0;
            });
        }

        return result;
    }

    protected _loadDataFromFile() {
        const rawData = readFileSync(this._filePath, 'utf-8');
        return JSON.parse(rawData) as T[];
    }
}
