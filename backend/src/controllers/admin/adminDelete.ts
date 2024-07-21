import { Request, Response } from 'express';
import Admin from '../../models/admin';
import { CustomRequest, userInt } from '../../middleware/authenticate';
import { JwtPayload } from 'jsonwebtoken';
import { DeleteRecord } from '../../interfaces/deleteRecord';

export const adminDelete = async (req: Request, res: Response): Promise<Response> => {

    const { targetAdminID }: {targetAdminID: string} = req.body;
    const admin: userInt | JwtPayload = (req as CustomRequest).user;

    try {
        
        const record = await Admin.deleteOne({ _id: targetAdminID }) as DeleteRecord;

        if (record.deletedCount == 1) {
            return res.status(200).send({
                state: true,
                message: "Admin Deleted Successfully"
            })
        }
        else {
            return res.status(404).send({
                state: false,
                message: "Admin Not found or could not be deleted"
            })
        }

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            state: false,
            message: "Internal Server Error"
        })
        
    }

}