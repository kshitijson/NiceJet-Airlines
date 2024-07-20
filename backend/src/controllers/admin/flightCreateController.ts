import { Request, Response } from 'express';
import Flight, { IFlight } from '../../models/flight';
import { CustomRequest, userInt } from '../../middleware/authenticate';
import { JwtPayload } from 'jsonwebtoken';

export const FlightCreate = async (req: Request, res: Response): Promise<Response> => {

    try {
        
        const admin: userInt | JwtPayload = (req as CustomRequest).user;
        const { flight }: { flight: IFlight } = req.body;

        const flightexists: IFlight[] = await Flight.find({ flightNumber: flight.flightNumber });
        if (flightexists.length > 0) 
            return res.status(409).send({
                state: false,
                message: "Flight Already Exists"
            })

        const newFlight: IFlight = new Flight({
            ...flight,
            createdBy: admin.userId
        });
        await newFlight.save();

        return res.status(201).send({
            state: true,
            message: "Flight Created Successfully"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            status: false,
            message: "Internal Server Error"
        });
    }

}