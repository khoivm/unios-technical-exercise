import { Room } from '@/domain/room';
import { FileSystemRepository } from '@/repositories/FileSystemRepository';

class RoomFileSystemRepository extends FileSystemRepository<Room> {
    constructor() {
        super('db/data/rooms.json');
    }
}

export { RoomFileSystemRepository };
export default RoomFileSystemRepository;
