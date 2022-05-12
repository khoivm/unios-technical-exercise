import { PrismaClient } from '@prisma/client';
import IRepository, { RepositoryModel, SearchFilter, SearchOptions } from './IRepository';

export abstract class PrismaRepository<T extends RepositoryModel> implements IRepository<T> {
    protected _modelName: string;
    protected _prisma: PrismaClient;

    constructor(modelName: string) {
        this._modelName = modelName.toLowerCase();
        this._prisma = new PrismaClient();
    }

    async create(data: T) {
        if (Object.values(data).every((v) => v === null || v === undefined)) throw new Error('The supplied object is empty');

        return await this._prisma[this._modelName].create({ data });
    }

    async delete(id: number) {
        if (id < 1) throw new Error(`Invalid id supplied`);

        return await this._prisma[this._modelName].delete({
            where: { id },
        });
    }

    async find(id: number) {
        if (id < 1) throw new Error(`Invalid id supplied`);

        return await this._prisma[this._modelName].findUnique({
            where: { id },
        });
    }

    async findMany(filter?: SearchFilter<T>, options?: SearchOptions<T>) {
        const where = filter || undefined;
        const orderBy = options?.sortField ? { [options.sortField]: options?.sortDirection || 'asc' } : undefined;
        const take = options?.pageSize || undefined;
        const skip = options?.page && take ? options.page & take : undefined;

        const [result, totalRecords] = await this._prisma.$transaction([
            this._prisma[this._modelName].findMany({ where, orderBy, take, skip }),
            this._prisma[this._modelName].count({ where }),
        ]);
        return { result, totalRecords };
    }

    async update(id: number, data: T) {
        if (id < 1) throw new Error(`Invalid id supplied`);
        if (id !== data.id) throw new Error(`Specified id does not match object identifier`);

        return await this._prisma[this._modelName].update({
            where: { id },
            data,
        });
    }
}
