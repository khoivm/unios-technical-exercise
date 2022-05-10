import { NextApiHandler } from 'next';
import { Teacher } from '@/domain/teacher';
import { TeacherRepository } from '@/repositories/teachers';
import { ApiResponse, extractSearchFilter, extractSearchOptions, HandlerCollection } from '@/utils/api';
import { HttpCode } from '@/utils/http';

const handler: NextApiHandler = async (req, res) => {
    const requestHandler = requestHandlers[req.method];
    if (!requestHandler) return res.status(HttpCode.METHOD_NOT_ALLOWED).end();
    return await requestHandler(req, res);
};

const getHandler: NextApiHandler<ApiResponse<Teacher[]>> = async (req, res) => {
    try {
        const filters = extractSearchFilter<Teacher>(req.query);
        const options = extractSearchOptions<Teacher>(req.query);

        const repo = new TeacherRepository();
        const { result: data, totalRecords } = await repo.findMany(filters, options);

        const payload = {
            data,
            page: options.page,
            pageSize: data.length,
            totalRecords,
        };

        return res.status(HttpCode.OK).json(payload);
    } catch (e) {
        const message = `An unhandled error occurred in 'GET: ${req.url}: ${e?.message || 'Unknown error'}`;
        console.error(message);

        res.statusMessage = message;
        return res.status(HttpCode.INTERNAL_SERVER_ERROR).end();
    }
};

const postHandler: NextApiHandler = async (req, res) => {
    try {
        const data = req?.body as Teacher;
        const repo = new TeacherRepository();
        await repo.create(data);

        return res.status(HttpCode.CREATED).end();
    } catch (e) {
        const message = `An unhandled error occurred in 'POST: ${req.url}: ${e?.message || 'Unkonwn error'}`;
        console.error(message);

        res.statusMessage = message;
        return res.status(HttpCode.INTERNAL_SERVER_ERROR).end();
    }
};

const requestHandlers: HandlerCollection = {
    GET: getHandler,
    POST: postHandler,
};

export default handler;
