import { TeacherFileSystemRepository } from './teacherFileSystemRepo';
import { TeacherPrismaRepository } from './teacherPrismaRepo';

const TeacherRepository = Boolean(process.env.USE_DATABASE) === true ? TeacherPrismaRepository : TeacherFileSystemRepository;

export { TeacherRepository };
export default TeacherRepository;
