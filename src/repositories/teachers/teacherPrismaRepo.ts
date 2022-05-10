import { Teacher } from '@/domain/teacher';
import IRepository, { FindManyResult } from '@/repositories/IRepository';

export class TeacherPrismaRepository implements IRepository<Teacher> {
    async create(data: Teacher) {
        throw new Error('TODO: Not implemented');
    }

    async delete(id: number) {
        throw new Error('TODO: Not implemented');
    }

    async find(id: number): Promise<Teacher> {
        throw new Error('TODO: Not implemented');
    }

    async findMany(): Promise<FindManyResult<Teacher>> {
        throw new Error('TODO: Not implemented');
    }

    async update(id: number, data: Teacher) {
        throw new Error('TODO: Not implemented');
    }
}
