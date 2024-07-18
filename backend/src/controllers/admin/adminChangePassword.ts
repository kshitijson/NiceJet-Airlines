// 1. Authenticate middleware
// 2. req.user - check in DB and fetch its password
// 3. bcrypt.compare(received password, DB hashed password)
// 4. hash(received password)
// 5. update the password field in the DB for the req.user

import { Request, Response } from 'express';
import Admin, { IAdmin } from '../../models/admin';
import { CustomRequest, userInt } from '../../middleware/authenticate';
import { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcrypt';

interface updateInterface {
    acknowledged: boolean,
    modifiedCount: number,
    upsertedId: string | null,
    upsertedCount: number,
    matchedCount: number
}

export const AdminChangePassword = async (req: Request, res: Response): Promise<Response> => {

    const { oldPassword, newPassword }: { oldPassword: string, newPassword: string } = req.body;

    const admin: userInt | JwtPayload = (req as CustomRequest).user;

    // admin can be of any two types, so ensure the admin is of userInt type when fetching the userID
    // from within the object
    // const admin_id: string = (admin as userInt).userId;

    try {
        const adminObject: IAdmin | null = await Admin.findOne({ _id: admin.userId });

        if (!adminObject) 
            return res.status(404).send({
                state: false,
                message: "Admin Not Found"
            })

        const match = await bcrypt.compare(oldPassword, adminObject.password);
        if (!match)
            return res.status(401).send({
                state: false,
                message: "Invalid Password"
            })
        
        const saltRounds = 10;
        const hashedPassword: string = bcrypt.hashSync(newPassword, saltRounds);
        const updateResult = await Admin.updateOne(
            { _id: admin.userId },
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