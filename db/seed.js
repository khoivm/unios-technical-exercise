const { Prisma, PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const rooms = require('./data/rooms.json');
const sessions = require('./data/sessions.json');
const teachers = require('./data/teachers.json');
const lessons = require('./data/lessons.json');

async function main() {
    const seedRooms = async () => {
        if (!rooms) return;

        console.log('Seeding rooms...');
        return await prisma.room.createMany({
            data: rooms,
            skipDuplicates: true,
        });
    };
    await seedRooms();

    const seedSessions = async () => {
        if (!sessions) return;

        console.log('Seeding sessions...');
        return await prisma.session.createMany({
            data: sessions,
            skipDuplicates: true,
        });
    };
    await seedSessions();

    const seedTeachers = async () => {
        if (!teachers) return;

        console.log('Seeding teachers...');
        return await prisma.teacher.createMany({
            data: teachers,
            skipDuplicates: true,
        });
    };
    await seedTeachers();

    const seedLessons = async () => {
        if (!lessons) return;

        console.log('Seeding lessons...');
        return await prisma.lesson.createMany({
            data: lessons,
            skipDuplicates: true,
        });
    };
    await seedLessons();

    // reset all sequences
    const resetSequences = async () => {
        console.log('Resetting sequences...');
        await prisma.$executeRaw(
            Prisma.sql`SELECT setval(pg_get_serial_sequence('"Room"', 'id'), coalesce(max(id)+1, 1), false) FROM "Room";`
        );
        await prisma.$executeRaw(
            Prisma.sql`SELECT setval(pg_get_serial_sequence('"Session"', 'id'), coalesce(max(id)+1, 1), false) FROM "Session";`
        );
        await prisma.$executeRaw(
            Prisma.sql`SELECT setval(pg_get_serial_sequence('"Teacher"', 'id'), coalesce(max(id)+1, 1), false) FROM "Teacher";`
        );
        await prisma.$executeRaw(
            Prisma.sql`SELECT setval(pg_get_serial_sequence('"Lesson"', 'id'), coalesce(max(id)+1, 1), false) FROM "Lesson";`
        );
    };
    await resetSequences();
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
