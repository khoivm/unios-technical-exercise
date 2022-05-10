import { Room } from '@/domain/room';
import IRepository, { FindManyResult } from '@/repositories/IRepository';

export class RoomPrismaRepository implements IRepository<Room> {
    async create(data: Room) {
        throw new Error('TODO: Not implemented');
    }

    async delete(id: number) {
        throw new Error('TODO: Not implemented');
    }

    async find(id: number): Promise<Room> {
        throw new Error('TODO: Not implemented');
    }

    async findMany(): Promise<FindManyResult<Room>> {
        throw new Error('TODO: Not implemented');
    }

    async update(id: number, data: Room) {
        throw new Error('TODO: Not implemented');
    }
}
