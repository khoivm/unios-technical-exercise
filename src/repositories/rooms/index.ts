import { RoomFileSystemRepository } from './roomFileSystemRepo';
import { RoomPrismaRepository } from './roomPrismaRepo';

const RoomRepository = process.env.USE_DATABASE === 'true' ? RoomPrismaRepository : RoomFileSystemRepository;

export { RoomRepository };
export default RoomRepository;
