import { Session } from '@/domain/session';
import { PrismaRepository } from '../PrismaRepository';

class SessionPrismaRepository extends PrismaRepository<Session> {
    constructor() {
        super('session');
    }
}

export { SessionPrismaRepository };
export default SessionPrismaRepository;
