import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';
import jwt, { Secret, JwtPayload } from 'jsonwebtoken'; // Ensure @types/jsonwebtoken is installed

dotenv.config({ path: __dirname + '/../../.env' });

interface userInt {
    userId: string;
    iat: number;
}

export interface CustomRequest extends Request {
    user: userInt | JwtPayload;
}

export const authUser = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1]; // Extract token if available

    if (!token) {
        return res.sendStatus(401); // Unauthorized if no token is provided
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN as Secret);
        if (typeof decoded === 'object' && decoded !== null) {
            (req as CustomRequest).user = decoded as userInt;
        } else {
            res.status(401).send({
                state: false,
                message: "Unauthorized Access"
            });
        }

        next();
    } catch (err) {
        res.status(401).send({
            state: false,
            message: "Unauthorized Access"
        });
    }
};

export type { userInt }