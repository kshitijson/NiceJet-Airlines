import { Request, Response } from 'express';
import User, { IUser } from '../../models/user';
import bcrypt from 'bcrypt';
import { CustomRequest, userInt } from '../../middleware/authenticate';
import { JwtPayload } from 'jsonwebtoken';

interface updateInterface {
    acknowledged: boolean,
    modifiedCount: number,
    upsertedId: string | null,
    upsertedCount: number,
    matchedCount: number
}

export const ChangePassword = async (req: Request, res: Response): Promise<Response> => {

    const { oldPassword, newPassword }: { oldPassword: string, newPassword: string } = req.body;

    const user: userInt | JwtPayload = (req as CustomRequest).user;

    try {
        const userObject: IUser | null = await User.findOne({ _id: user.userId });

        if (!userObject ) 
            return res.status(404).send({
                state: false,
                message: "User Not Found"
            })

        const match = await bcrypt.compare(oldPassword, userObject  .password);
        if (!match)
            return res.status(401).send({
                state: false,
                message: "Invalid Password"
            })
        
        const saltRounds = 10;
        const hashedPassword: string = bcrypt.hashSync(newPassword, saltRounds);
        const updateResult = await User.updateOne(
            { _id: user.userId },
            {
                $set: { password: hashedPassword }
            },
            { upsert: false }
        ) as updateInterface;

        if (updateResult.modifiedCount === 1)
            return res.status(200).send({
                state: false,
                message: "Password Changed Successfully"
            })
        else 
            return res.status(404).send({
                state: false,
                message: "Unable to Update Password, Please Try Again"
            })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            state: false,
            message: "Internal Server Error"
        })
    }

}