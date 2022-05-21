import { NextApiHandler } from 'next';
import { Teacher } from '@/domain/teacher';
import { LessonRepository } from '@/repositories/lessons';
import { ApiResponse, HandlerCollection } from '@/utils/api';
import { HttpCode } from '@/utils/http';

const handler: NextApiHandler = async (req, res) => {
    const requestHandler = requestHandlers[req.method];
    if (!requestHandler) return res.status(HttpCode.METHOD_NOT_ALLOWED).end();
    return await requestHandler(req, res);
};

const getHandler: NextApiHandler<ApiResponse<Teacher>> = async (req, res) => {
    try {
        const id = Number(req?.query?.id);
        const repo = new LessonRepository();
        const data = await repo.findMany({
            // @ts-ignore
            where: {
                teacher: {
                    id
                },
            },
            select: {
                name: true,
            },
            include: {
                teacher: {
                    select: {
                        name: true
                    }
                },
                room: {
                    select: {
                        name: true,
                        roomCode: true,
                    }
                },
                session: {
                    select: {
                        day: true,
                        startTime: true,
                    }
                },
            }
        });
        

        if (data === null) return res.status(HttpCode.NOT_FOUND).end();

        const payload = {
            data: data.result,
            page: 1,
            pageSize: 1,
            totalRecords: 1,
        };

        return res.status(HttpCode.OK).json(payload);
    } catch (e) {
        const message = `An unhandled error occurred in 'GET: ${req.url}: ${e?.message || 'Unknown error'}`;
        console.error(message);

        res.statusMessage = message;
        return res.status(HttpCode.INTERNAL_SERVER_ERROR).end();
    }
};

const requestHandlers: HandlerCollection = {
    GET: getHandler,
};

export default handler;
