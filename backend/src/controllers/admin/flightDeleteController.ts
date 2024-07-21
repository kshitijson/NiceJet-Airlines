import { Request, Response } from 'express';
import Flight, { IFlight } from '../../models/flight';
import { serverErrMsg } from '../../utils/serverErr';
import { DeleteRecord } from '../../interfaces/deleteRecord';

export const FlightDelete = async (req: Request, res: Response): Promise<Response> => {
    
    try {
        
        const { flightID }: { flightID: string } = req.body;

        const record = await Flight.deleteOne({ _id: flightID }) as DeleteRecord;

        if (record.deletedCount == 1) {
            return res.status(200).send({
                state: true,
                message: "Flight Deleted Successfully"
            })
        }
        else {
            return res.status(404).send({
                state: false,
                message: "Flight Not found or could not be deleted"
            })
        }

    } catch (error) {
        console.log(error);
        return res.status(500).send(serverErrMsg);
    }

}