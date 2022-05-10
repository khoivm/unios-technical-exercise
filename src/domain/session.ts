export type SessionDay = 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
export type SessionStart = '9:00' | '10:00' | '11:00' | '12:00' | '13:00' | '14:00' | '15:00' | '16:00';

export interface Session {
    id: number;
    day: string;
    startTime: string;
}
