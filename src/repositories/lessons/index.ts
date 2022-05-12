import { LessonFileSystemRepository } from './lessonFileSystemRepo';
import { LessonPrismaRepository } from './lessonPrismaRepo';

const LessonRepository = process.env.USE_DATABASE === 'true' ? LessonPrismaRepository : LessonFileSystemRepository;

export { LessonRepository };
export default LessonRepository;
