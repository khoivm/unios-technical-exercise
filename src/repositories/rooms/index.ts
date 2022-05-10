import { RoomFileSystemRepository } from './roomFileSystemRepo';
import { RoomPrismaRepository } from './roomPrismaRepo';

const RoomRepository = Boolean(process.env.USE_DATABASE) === true ? RoomPrismaRepository : RoomFileSystemRepository;

export { RoomRepository };
export default RoomRepository;
