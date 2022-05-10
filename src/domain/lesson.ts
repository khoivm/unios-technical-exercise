import { Room } from './room';
import { Session } from './session';
import { Teacher } from './teacher';

export interface Lesson {
    id: number;
    name: string;
    room: Room;
    session: Session;
    teacher: Teacher;
}
