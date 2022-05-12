import { Teacher } from '@/domain/teacher';
import { PrismaRepository } from '../PrismaRepository';

class TeacherPrismaRepository extends PrismaRepository<Teacher> {
    constructor() {
        super('teacher');
    }
}

export { TeacherPrismaRepository };
export default TeacherPrismaRepository;
