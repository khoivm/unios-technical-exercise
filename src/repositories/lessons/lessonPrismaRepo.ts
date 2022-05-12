import { Lesson } from '@/domain/lesson';
import { PrismaRepository } from '../PrismaRepository';

class LessonPrismaRepository extends PrismaRepository<Lesson> {
    constructor() {
        super('lesson');
    }
}

export { LessonPrismaRepository };
export default LessonPrismaRepository;
