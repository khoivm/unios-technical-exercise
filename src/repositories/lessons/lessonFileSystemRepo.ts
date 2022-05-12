import { writeFileSync } from 'fs';
import { Lesson } from '@/domain/lesson';
import { FileSystemRepository } from '@/repositories/FileSystemRepository';

class LessonFileSystemRepository extends FileSystemRepository<Lesson> {
    constructor() {
        super('db/data/lessons.json');
    }

    async create(data: Lesson) {
        // only need to store the ids of the associated records
        const createDto = {
            id: data.id,
            name: data.name,
            roomId: data.room.id,
            sessionId: data.session.id,
            teacherId: data.teacher.id,
        };

        // append new data to existing data set and then rewrite to disk
        const state = this._loadDataFromFile();
        const nextId = Math.max(...state.map((d) => d.id)) + 1;
        const newState = [...state, { ...createDto, id: nextId }];
        writeFileSync(this._filePath, JSON.stringify(newState), 'utf-8');
    }
}

export { LessonFileSystemRepository };
export default LessonFileSystemRepository;
