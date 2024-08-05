import { Request, Response } from 'express';
import Flight, { IFlight } from '../../models/flight';
import { CustomRequest, userInt } from '../../middleware/authenticate';
import { JwtPayload } from 'jsonwebtoken';
import { Seat, ISeat } from '../../models/seat';
import { serverErrMsg } from '../../utils/serverErr';

export const FlightCreate = async (req: Request, res: Response): Promise<Response> => {
    try {
        const admin: userInt | JwtPayload = (req as CustomRequest).user;
        const { flight }: { flight: IFlight } = req.body;

        // Check if the flight already exists
        const flightExists: IFlight[] = await Flight.find({ flightNumber: flight.flightNumber });
        if (flightExists.length > 0)
            return res.status(409).send({
                state: false,
                message: "Flight Already Exists"
            });

        // Handle seats separately
        const seatIds: Map<string, string> = new Map();
        for (const [seatType, seatData] of Object.entries(flight.seats)) {
            const newSeat = new Seat({ type: seatType, ...seatData }) as ISeat;
            const savedSeat = await newSeat.save() as ISeat;
            seatIds.set(seatType, savedSeat._id.toString());
        }

        // Create the new flight object
        const newFlight: IFlight = new Flight({
            ...flight,
            seats: seatIds,
            createdBy: admin.userId
        });
        await newFlight.save();

        return res.status(201).send({
            state: true,
            message: "Flight Created Successfully"
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send(serverErrMsg);
    }
};
