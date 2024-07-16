import { Request, Response } from 'express';
import Admin, { IAdmin } from '../../models/admin';
import bcrypt from 'bcrypt';
import { CustomRequest, userInt } from '../../middleware/authenticate';
import { JwtPayload } from 'jsonwebtoken';

export const AdminCreate = async (req: Request, res: Response): Promise<Response> => {

    const admin: userInt | JwtPayload = (req as CustomRequest).user;
    let createdBy;

    // fetch the created by admin users object id, from the req.user as the adminID received from the middleware.
    try {
        const adminFind = await Admin.findOne({ AdminID: admin.userId });
        createdBy = adminFind? adminFind._id: null;
    } catch (error) {
        console.log("===========================================");
        console.log(error);
        return res.status(500).send({
            status: false,
            message: "Internal Server Error"
        });
    }

    const { AdminID, password }: { AdminID: string; password: string } = req.body;

    try {
        const adminFind: IAdmin[] = await Admin.find({ AdminID });
        if (adminFind.length > 0) {
            return res.status(409).send({
                status: false,
                message: "Admin Already Exists"
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
        const newAdmin: IAdmin = new Admin({
            AdminID,
            password: hashedPassword,
            createdBy
        });
        await newAdmin.save();
        return res.status(201).send({
            status: true,
            message: "Admin Created Successfully"
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            status: false,
            message: "Internal Server Error"
        });
    }

}