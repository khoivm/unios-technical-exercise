import { NextApiHandler } from 'next';
import { Lesson } from '@/domain/lesson';
import { LessonRepository } from '@/repositories/lessons';
import { ApiResponse, extractSearchFilter, extractSearchOptions, HandlerCollection } from '@/utils/api';
import { HttpCode } from '@/utils/http';
import { Teacher } from '@/domain/teacher';
import TeacherFileSystemRepository from '@/repositories/teachers/teacherFileSystemRepo';
import { Session } from '@/domain/session';
import { Room } from '@/domain/room';
import { Prisma } from '@prisma/client';

const handler: NextApiHandler = async (req, res) => {
    const requestHandler = requestHandlers[req.method];
    if (!requestHandler) return res.status(HttpCode.METHOD_NOT_ALLOWED).end();
    return await requestHandler(req, res);
};

const getHandler: NextApiHandler = async (req, res) => {
    throw new Error('Not implemented.');
};

const postHandler: NextApiHandler = async (req, res) => {
    try {
        const data = JSON.parse(req?.body) as Lesson;
        const repo = new LessonRepository();

        if (!data.name 
            || !data.teacher.id 
            || !data.room.id
            || !data.session.id
        ) {
            // TODO: separate message for friendly experience.
            return res.status(HttpCode.BAD_REQUEST).json({
                success: false, 
                message: 'Class name and teacher and room and session are required.'
            });
        }

        //TODO: validation form data from fake POST data. E.g: teacher id 999

        // TODO: the typescript is refering to LessonFileSystemRepository here
        // but we are using the LessonPrismaRepository.
        // let's ignore for now
        const result = await repo.create({
            name: data.name,
            teacher: {
                // @ts-ignore
                connect: {
                    id: data.teacher.id
                }
            },
            room: {
                // @ts-ignore
                connect: {
                    id: data.room.id
                }
            },
            session: {
                // @ts-ignore
                connect: {
                    id: data.session.id
                }
            }
        });
        return res.status(HttpCode.CREATED).json({success: true});
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            if (e.code === 'P2002') {
                const message = `There is a unique constraint violation, a teacher cannot be double-booked for the same session` + 
                ` or a room cannot be double-booked for the same session`;
                console.error(
                  `A known error occurred in 'POST: ${req.url}: ` + message
                )
                return res.status(HttpCode.FORBIDDEN).json({
                    success: false,
                    message,
                });
            }
        }

        const message = `An unhandled error occurred in 'POST: ${req.url}: ${e?.message || 'Unkonwn error'}`;
        console.error(message);

        return res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
            success: false,
            message,
        });
    }
};

const requestHandlers: HandlerCollection = {
    GET: getHandler,
    POST: postHandler,
};

export default handler;
