import {FastifyError, FastifyReply, FastifyRequest} from 'fastify';
import jwt from 'jsonwebtoken';

export function isAuthenticated(req: FastifyRequest, res: FastifyReply, next: (err?: FastifyError) => void) {
    const { authorization } = req.headers;

    if (!authorization) {
        res.status(401);
        throw new Error('🚫 Un-Authorized 🚫');
    }

    try {
        const token = authorization.split(' ')[1];
        (req as any).payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET) as Record<string, any>;
    } catch (err) {
        res.status(401);
        if (err instanceof jwt.TokenExpiredError) {
            throw new Error(err.name);
        }
        throw new Error('🚫 Un-Authorized 🚫');
    }

    return next();
}
