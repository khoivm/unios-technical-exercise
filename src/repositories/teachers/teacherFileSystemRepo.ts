import { Teacher } from '@/domain/teacher';
import { FileSystemRepository } from '@/repositories/FileSystemRepository';

class TeacherFileSystemRepository extends FileSystemRepository<Teacher> {
    constructor() {
        super('db/data/teachers.json');
    }
}

export { TeacherFileSystemRepository };
export default TeacherFileSystemRepository;
