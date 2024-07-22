import { Request, Response } from 'express';
import Flight, { IFlight } from '../../models/flight';
import { serverErrMsg } from '../../utils/serverErr';
import { UpdateRecord } from '../../interfaces/updateRecord';

export const FlightUpdate = async (req: Request, res: Response): Promise<Response> => {

    try {
        
        const { flightID, flightUpdateDetails }: { flightID: string, flightUpdateDetails: IFlight } = req.body;
        const updateResult = await Flight.updateOne(
            { _id: flightID },
            {
                $set: flightUpdateDetails
            },
            { upsert: false }
        ) as UpdateRecord;

        if (updateResult.modifiedCount === 1) 
            return res.status(200).send({
                state: true,
                message: "Flight updated Successfully"
            });

        return res.status(404).send({
                state: true,
                message: "Unable to Update Flight Details, Please try again"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send(serverErrMsg);
    }

}