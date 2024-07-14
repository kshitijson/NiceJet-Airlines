import { Request, Response } from 'express';
import User, { IUser } from '../../models/user';
import bcrypt from 'bcrypt';

export const signup = async (req: Request, res: Response): Promise<Response> => {
    const { username, email, password }: { username: string; email: string; password: string } = req.body;

    // checking if user already exists
    try {
        const userFind: IUser[] = await User.find({ email });
        if (userFind.length > 0) {
            return res.status(409).send({
                status: false,
                message: "User Already Exists"
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            status: false,
            message: "Internal Server Error"
        });
    }

    // hashing the password
    const saltRounds = 10;
    const hashedPassword: string = bcrypt.hashSync(password, saltRounds);

    // adding the user into the database
    try {
        const newUser: IUser = new User({
            username,
            email,
            password: hashedPassword
        });
        await newUser.save();
        return res.status(201).send({
            status: true,
            message: "Registered Successfully"
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            status: false,
            message: "Internal Server Error"
        });
    }
};
