import { Lesson } from '@/domain/lesson';
import { FileSystemRepository } from '@/repositories/FileSystemRepository';

class LessonFileSystemRepository extends FileSystemRepository<Lesson> {
    constructor() {
        super('db/data/lessons.json');
    }
}

export { LessonFileSystemRepository };
export default LessonFileSystemRepository;
