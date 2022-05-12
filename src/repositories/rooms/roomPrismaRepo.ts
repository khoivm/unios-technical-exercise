import { Room } from '@/domain/room';
import { PrismaRepository } from '../PrismaRepository';

class RoomPrismaRepository extends PrismaRepository<Room> {
    constructor() {
        super('room');
    }
}

export { RoomPrismaRepository };
export default RoomPrismaRepository;
