import { Request, Response } from 'express';
import User, { IUser } from '../../models/user';
import Admin, { IAdmin } from '../../models/admin';
import { authToken } from '../utils/token';
import bcrypt from 'bcrypt';

export const AdminLogin = async (req: Request, res: Response): Promise<Response> => {

    // 1 --> Check if user exists
    // 2 --> Use bcrypt.compare check if the password in DB (hashed) and received plain text password match
    // 3 --> If they match, login is successfull, fetch the users _id from the document received, and use it to create a jwt token

    const { AdminID, password }: { AdminID: string; password: string } = req.body;

    // in case of a succesful login
    const clear = (token: string): Response => {
        return res.status(200).send({
            state: true,
            message: "Login Successful",
            token: token
        });
    };

    // in case of login unsuccessful due to credential mismatch
    const fail = (): Response => {
        return res.status(401).send({
            state: false,
            message: "Invalid Credentials"
        });
    };

    try {
        // fetch the admin document
        const user = await Admin.findOne({ AdminID }) as IAdmin;

        // extract the password from the document, if user exists then, else return fail()
        let dbPassword: string;
        if (user) {
            dbPassword = user.password;
        } else {
            return fail();
        }

        // compare the plain etxt and hashed DB password
        const match = await bcrypt.compare(password, dbPassword);
        // if match, create a token, pass it to the clear() function and return that function
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
