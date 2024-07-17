import { Request, Response } from 'express';
import Admin, { IAdmin } from '../../models/admin';
import { CustomRequest, userInt } from '../../middleware/authenticate';
import { JwtPayload } from 'jsonwebtoken';

export const ListAdmin = async (req: Request, res: Response): Promise<Response> => {

    const admin: userInt | JwtPayload = (req as CustomRequest).user;

    try {
        
        const admins: IAdmin[] | null = await Admin.find({ createdBy: admin.userId });

        return res.status(200).send({
            state: true,
            message: "Fetched Admins",
            admins
        })

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            state: false,
            message: "Internal Server Error"
        })
    }


}