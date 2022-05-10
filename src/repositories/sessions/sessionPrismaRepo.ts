import { Session } from '@/domain/session';
import IRepository, { FindManyResult } from '@/repositories/IRepository';

export class SessionPrismaRepository implements IRepository<Session> {
    async create(data: Session) {
        throw new Error('TODO: Not implemented');
    }

    async delete(id: number) {
        throw new Error('TODO: Not implemented');
    }

    async find(id: number): Promise<Session> {
        throw new Error('TODO: Not implemented');
    }

    async findMany(): Promise<FindManyResult<Session>> {
        throw new Error('TODO: Not implemented');
    }

    async update(id: number, data: Session) {
        throw new Error('TODO: Not implemented');
    }
}
