import { Session } from '@/domain/session';
import { FileSystemRepository } from '@/repositories/FileSystemRepository';

class SessionFileSystemRepository extends FileSystemRepository<Session> {
    constructor() {
        super('db/data/sessions.json');
    }
}

export { SessionFileSystemRepository };
export default SessionFileSystemRepository;
