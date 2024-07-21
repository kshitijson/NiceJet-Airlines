import { Request, Response } from 'express';
import User, { IUser } from '../../models/user';
import { authToken } from '../../utils/token';
import bcrypt from 'bcrypt';

export const login = async (req: Request, res: Response): Promise<Response> => {

    // 1 --> Check if user exists
    // 2 --> Use bcrypt.compare check if the password in DB (hashed) and received plain text password match
    // 3 --> If they match, login is successfull, fetch the users _id from the document received, and use it to create a jwt token

    // ===== Refer Admin Login controller for detailed comments, only chenge is that here USer model is used instead of Admin model

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
