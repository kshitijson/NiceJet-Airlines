import { Request, Response } from 'express';
import User, { IUser } from '../../models/user';
import { authToken } from '../utils/token';
import bcrypt from 'bcrypt';

export const login = async (req: Request, res: Response): Promise<Response> => {

    const { email, password }: { email: string; password: string } = req.body;

    const clear = (token: string): Response => {
        return res.status(200).send({
            state: true,
            message: "Login Successful",
            token: token
        });
    };

    const fail = (): Response => {
        return res.status(401).send({
            state: false,
            message: "Invalid Credentials"
        });
    };

    try {
        const user = await User.findOne({ email }) as IUser;

        let dbPassword: string;
        if (user) {
            dbPassword = user.password;
        } else {
            return fail();
        }

        const match = await bcrypt.compare(password, dbPassword);
        if (match) {
            const token = authToken(user._id);
            return clear(token);
        } else {
            return fail();
        }

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            state: false,
            message: "Internal Server Error"
        });
    }
};
