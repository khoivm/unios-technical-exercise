import { NextApiHandler } from 'next';
import { Lesson } from '@/domain/lesson';
import { LessonRepository } from '@/repositories/lessons';
import { ApiResponse, HandlerCollection } from '@/utils/api';
import { HttpCode } from '@/utils/http';

const handler: NextApiHandler = async (req, res) => {
    const requestHandler = requestHandlers[req.method];
    if (!requestHandler) return res.status(HttpCode.METHOD_NOT_ALLOWED).end();
    return await requestHandler(req, res);
};

const getHandler: NextApiHandler<ApiResponse<Lesson>> = async (req, res) => {
    throw new Error('Not implemented');
};

const putHandler: NextApiHandler = async (req, res) => {
    throw new Error('Not implemented');
};

const deleteHandler: NextApiHandler = async (req, res) => {
    throw new Error('Not implemented');
};

const requestHandlers: HandlerCollection = {
    GET: getHandler,
    PUT: putHandler,
    DELETE: deleteHandler,
};

export default handler;
