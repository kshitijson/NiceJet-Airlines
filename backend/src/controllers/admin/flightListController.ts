import { Request, Response } from 'express';
import Flight, { IFlight } from '../../models/flight';
import { CustomRequest, userInt } from '../../middleware/authenticate';
import { JwtPayload } from 'jsonwebtoken';
import { serverErrMsg } from '../../utils/serverErr';

export const FlightList = async (req: Request, res: Response): Promise<Response> => {

    try {
        
        const admin: userInt | JwtPayload = (req as CustomRequest).user;

        const flightDetails: IFlight[] = await Flight.find({ createdBy: admin.userId }).populate('seats');

        return res.status(200).send({
            state: true,
            message: "Flight Details Fetched Successfully",
            flightDetails
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send(serverErrMsg);
    }

}