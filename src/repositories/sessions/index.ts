import { SessionFileSystemRepository } from './sessionFileSystemRepo';
import { SessionPrismaRepository } from './sessionPrismaRepo';

const SessionRepository = Boolean(process.env.USE_DATABASE) === true ? SessionPrismaRepository : SessionFileSystemRepository;

export { SessionRepository };
export default SessionRepository;
