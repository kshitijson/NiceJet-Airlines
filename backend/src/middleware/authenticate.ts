import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';
import jwt, { Secret, JwtPayload } from 'jsonwebtoken'; // Ensure @types/jsonwebtoken is installed

dotenv.config({ path: __dirname + '/../../.env' });

export interface CustomRequest extends Request {
    user: string | JwtPayload;
}

const authUser = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1]; // Extract token if available

    if (!token) {
        return res.sendStatus(401); // Unauthorized if no token is provided
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN as Secret);
        (req as CustomRequest).user = decoded;

        next();
    } catch (err) {
        res.status(401).send({
            state: false,
            message: "Unauthorized Access"
        });
    }
};

export { authUser };
