import { TeacherFileSystemRepository } from './teacherFileSystemRepo';
import { TeacherPrismaRepository } from './teacherPrismaRepo';

const TeacherRepository = process.env.USE_DATABASE === 'true' ? TeacherPrismaRepository : TeacherFileSystemRepository;

export { TeacherRepository };
export default TeacherRepository;
