import { Lesson } from '@/domain/lesson';
import IRepository, { FindManyResult } from '@/repositories/IRepository';

export class LessonPrismaRepository implements IRepository<Lesson> {
    async create(data: Lesson) {
        throw new Error('TODO: Not implemented');
    }

    async delete(id: number) {
        throw new Error('TODO: Not implemented');
    }

    async find(id: number): Promise<Lesson> {
        throw new Error('TODO: Not implemented');
    }

    async findMany(): Promise<FindManyResult<Lesson>> {
        throw new Error('TODO: Not implemented');
    }

    async update(id: number, data: Lesson) {
        throw new Error('TODO: Not implemented');
    }
}
